const express = require('express');
const router = express.Router();
const Log = require('../../models/Log');

// @route   GET api/admin/logs
// @desc    Get All logs Users
// @access  Public
router.get('/logs', (req, res) => {
  Log.find()
      .sort({date_logged: -1})
      .then((logs) => res.json(logs));
});

module.exports = router;
