const express = require('express');
const router = express.Router();

// @route     GET api/stamps
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('stamps route'));

module.exports = router;
