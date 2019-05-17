const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const StampCard = require('../../models/StampCard');

// @route    GET api/stamps
// @desc     Test route
// @access   Public
router.get('/', (req, res) => res.send('stamps route'));

// @route    GET api/stamps/me
// @desc     Get user's stamp card
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const stampCard = await StampCard.findOne({ user: req.user.id });

    if (!stampCard) {
      return res.status(400).json({ msg: 'There is no stamp card for this user' });
    }
    res.json(stampCard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/stamps/record 
// @desc     Put stamp(s) on stamp card 
// @access   Private 
router.put('/', [ 
  auth,
  [
    check('email', 'Please include a valid email').isEmail(),
    check('points', 'Please enter the amount of points').not().isEmpty()
  ]
 ], async (req, res) => { 
  console.log(req.user.id)
  const { points, email } = req.body; 

  const admin = await User.findById(req.user.id);

  if (!admin) {
    return res.status(400).json({ msg: 'This user does not exist' });
  }

  // check if admin 
  if(admin.admin) {
    // find user to give points to
    const user = await User.findOne({ email });
    if (!user) {
     return res.status(400).json({ msg: 'This user does not exist' });
    }

    // get user's stamp card 
    let stampCard = await StampCard.findOne({ user: user._id });
    if(!stampCard) {
      return res.status(400).json({ msg: 'There is no stamp card found for this email' });
    }
    
    // update their stamp card 
    let updatedStampCard = {};
    updatedStampCard.points = stampCard.points + points;
    updatedStampCard.careerPoints = stampCard.careerPoints + points; 
    stampCard = await StampCard.findOneAndUpdate(
      { user: req.user.id },
      { $set: updatedStampCard },
      { new: true }
    );
    
    // return udpated stamp card
    res.json(stampCard); 
  } else {
    // Doesn't have permission
    return res.status(400).json({ msg: 'You do not have permission.' });
  }
  // record +1 to the user specified with the amount of drinks 
});

module.exports = router;
