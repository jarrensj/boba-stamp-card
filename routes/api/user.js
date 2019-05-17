const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route     POST api/user
// @desc      Register user
// @access    Public
router.post('/', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Please include a phone number'),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      phone,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if(err) throw err;
        res.json({ token })
      }
    );
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     PUT api/user/password
// @desc      Update user's password 
// @access    Private
router.put('/password', [ auth, 
  [
    check(
      'password',
      'Current password is required'
    ).exists(),
    check(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res
      .status(400)
      .json({ errors: [{ msg: 'User not found' }] });
    }


    let { password, newPassword } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(newPassword, salt);

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { password } },
      { new: true }
    );

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;