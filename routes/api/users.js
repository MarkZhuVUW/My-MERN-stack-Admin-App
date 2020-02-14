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
router.get("/", (req, res) => {
  User.find()
    .sort({ register_date: -1 })
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password, company, role } = req.body;

  // Simple validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name: name,
      email: email,
      password: password,
      role: role,
      company: company ? company : ""
    });
    console.log(user);
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
            if (err) throw err;

            return res.json({
              msg: "register successfull"
            });
          });
        });
      });
    });
  });
});

// @route   DELETE api/users
// @desc    delete one user
// @access  Public
router.delete("/:id", auth, (req, res) => {
  // Check for existing user

  User.findById(req.params.id).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    return user
      .remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });
});

// @route   PATCH api/users/:id/logs
// @desc    update logs for a specific user
// @access  Public
router.patch("/:id/logs", auth, (req, res) => {
  const { log } = req.body;
  newLog = new Log({
    type: log.type,
    email: log.email,
    name: log.name,
    explanation: log.explanation,
    role: log.role
  })
    .save()
    .then(savedLog => {
      // Check for existing user
      User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            logs: savedLog
          }
        }
      )
        .then(user => {
          if (!user)
            return res.status(400).json({ msg: "User does not exist" });
          res.json(user);
        })
        .catch(err => res.status(400).json({ success: false }));
    });
});

// @route   PATCH api/users/:id
// @desc    update user (profile)
// @access  Public
router.patch("/:id", auth, (req, res) => {
  // Check for existing user
  const { email, name, role } = req.body;

  if (!email || !name || !role)
    return res.status(400).json({
      msg: "request body should contain the updated user information "
    });

  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        email: email,
        role: role
      }
    }
  )
    .then(user => {
      if (!user) return res.status(404).json({ msg: "User does not exist" });
      res.json(user);
    })
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/users/:id/logs
// @desc    Get All Registered Users
// @access  Public
router.get("/:id/logs", auth, (req, res) => {
  User.findById(req.params.id)
    .sort({ register_date: -1 })
    .then(user => res.json(user.logs))
    .catch(err => res.status(404).json({ msg: "user not found" }));
});

// @route   DELETE api/users/:userid/logs/logid
// @desc    delete one log record for a specified user
// @access  Public
router.delete("/:userid/logs/:logid", auth, (req, res) => {
  // Check for existing user

  console.log(req.params.userid);
  User.findByIdAndUpdate(
    { _id: req.params.userid },
    {
      $pull: {
        logs: { _id: req.params.logid }
      }
    }
  )
    .then(() => {
      Log.findById(req.params.logid)
        .then(log => {
          return log
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(400).json({ success: false }));
        })
        .catch(err => res.status(400).json({ msg: "log not found" }));
    })
    .catch(err => res.status(400).json({ msg: "user not found" }));
});
module.exports = router;
