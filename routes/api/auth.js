const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const axios = require("axios");

// User Model
const userModels = require("../../models/User");

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  userModels.User.findById(req.user.id)
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
  userModels.User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User Does not exist" });

      // Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
          // if (err) throw err;
          res.json({
            token,
            user,
          });
        });
      });
    })
    .catch((err) => res.status(400).json(err));
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
  userModels.User.findOne({ email }).then((user) => {
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

// @route   GET api/auth/github-access-token
// @desc    login
// @access  Private
router.post("/github-access-token", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.send({
      success: false,
      msg: "error no code",
    });
  }

  //get client_id and client_secret from a json file so that it is not exposed.
  const githubClientId = config.get("githubClientId");
  const githubClientSecret = config.get("github_client_secret");

  const body = JSON.stringify({
    client_id: githubClientId,
    client_secret: githubClientSecret,
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

// @route   GET api/auth/github-access-token
// @desc    login
// @access  Private
router.get("/github-user", (req, res) => {
  const githubUserConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + req.headers.access_token,
    },
  };

  //get github user.

  axios
    .get(`https://api.github.com/user`, githubUserConfig)
    .then((githubUserRes) => {
      // check if the github user already exists in my mongodb database.
      let uniqueId = githubUserRes.data.id;
      userModels.OauthUser.findOne({ uniqueId }).then((githubUser) => {
        if (githubUser) return res.json(githubUser);
        return res.json(githubUserRes.data);
      });
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
