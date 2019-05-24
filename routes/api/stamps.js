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

// @route    PUT api/stamps 
// @desc     Put stamp(s) on stamp card 
// @access   Private 
router.put('/', [ 
  auth,
  [
    check('email', 'Please include a valid email').isEmail(),
    check('points', 'Please enter the amount of points').not().isEmpty()
  ]
], async (req, res) => { 
  try {
    let { points, email } = req.body; 

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
      
      // convert string to int

      points = parseInt(points, 10);

      stampCard.points = stampCard.points + points;
      stampCard.careerPoints = stampCard.careerPoints + points; 
      if(stampCard.points / 10 >= 1) {
        stampCard.rewards = stampCard.rewards + Math.floor(stampCard.points / 10);
        stampCard.points = stampCard.points % 10;
      }
      stampCard = await StampCard.findOneAndUpdate(
        { user: req.user.id },
        { $set: stampCard },
        { new: true }
      );
      
      // return udpated stamp card
      res.json(stampCard); 
    } else {
      // Doesn't have permission
      return res.status(400).json({ msg: 'You do not have permission.' });
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/stamps/redeem
// @desc     Redeem a reward  
// @access   Private 
router.put('/redeem', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'This user does not exist' });
    }
  
    let stampCard = await StampCard.findOne({ user: user._id });
    if(!stampCard) {
      return res.status(400).json({ msg: 'There is no stamp card for this user '});
    }
  
    // check if they have a reward 
    if(stampCard.rewards > 0) {
      // redeem the reward 
  
      stampCard = await StampCard.findOneAndUpdate( 
        { user: req.user.id },
        { $inc: { rewards: -1 } },
        { new: true }
      );
      
      // return updated stamp card
      res.json(stampCard);
    }
    else {
      return res.status(400).json({ msg: 'You do not have any rewards to redeem'});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
