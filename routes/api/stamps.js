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

module.exports = router;
