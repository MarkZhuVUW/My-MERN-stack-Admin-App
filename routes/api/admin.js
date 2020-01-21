const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");
const Log = require("../../models/Log");

// @route   GET api/users
// @desc    Get All Registered Users
// @access  Public
router.get("/logs", (req, res) => {
  Log.find()
    .sort({ register_date: -1 })
    .then(users => res.json(users));
});
