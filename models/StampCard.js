const mongoose = require('mongoose');

const StampCard = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  points: {
    type: Number
  },
  careerPoints: {
    type: Number
  },
  rewards: {
    type: [String]
  }
});

module.exports = Profile = mongoose.model('StampCard', StampCard);
