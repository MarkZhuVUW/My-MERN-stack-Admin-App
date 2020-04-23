/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const axios = require("axios");

// User Model
const User = require("../../models/User");

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => res.json({ msg: "user not found" }));
});

// @route   GET api/auth/
// @desc    login
// @access  Private
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user,
        });
      });
    });
  });
});

// @route   GET api/auth/
// @desc    login
// @access  Private
router.get("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user,
        });
      });
    });
  });
});

// Github Oauth

// @route   GET api/auth/github-user
// @desc    login
// @access  Private
router.post("/github-user", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.send({
      success: false,
      msg: "error no code",
    });
  }

  //get client_id and client_secret from a json file so that it is not exposed.
  const clientId = config.get("clientId");
  const clientSecret = config.get("clientSecret");

  const body = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
  });

  //get access token.
  axios
    .post(`https://github.com/login/oauth/access_token`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((accessTokenRes) => {
      return res.json(accessTokenRes.data);
    })
    .catch((err) => {
      // console.log(err);
      return res.status(401).json({
        success: false,
        msg: err.body,
      });
    });
});

module.exports = router;
