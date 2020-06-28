const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Models
const userModels = require("../../models/User");
const OauthUser = require("../../models/User");

const Log = require("../../models/Log");

// @route   GET api/users
// @desc    Get All Registered Users
// @access  Public
router.get("/", (req, res) => {
  userModels.User.find()
    .sort({ register_date: -1 })
    .then((users) => res.json(users));
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
  userModels.User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new userModels.User({
      name,
      email,
      password,
      role,
      company: company || "",
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
            if (err) throw err;

            return res.json({
              msg: "register successfull",
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

  userModels.User.findById(req.params.id).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    return user
      .remove()
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(404).json({ success: false }));
  });
});

// @route   PATCH api/users/:id/logs
// @desc    update logs for a specific user
// @access  Public
router.patch("/:id/logs", auth, (req, res) => {
  const { log, isOauth } = req.body;
  new Log({
    type: log.type,
    email: log.email,
    name: log.name,
    explanation: log.explanation,
    role: log.role,
    company: log.company,
  })
    .save()
    .then((savedLog) => {
      // Check for existing user
      let userPromise = userModels.User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            logs: savedLog,
          },
        }
      );
      if (isOauth)
        userPromise = userModels.OauthUser.findAndUpdate(
          { uniqueId: req.params.id },
          {
            $push: {
              logs: savedLog,
            },
          }
        );
      else
        userPromise
          .then((user) => {
            if (!user)
              return res.status(400).json({ msg: "User does not exist" });
            res.json(user);
          })
          .catch((err) => res.status(400).json({ success: false }));
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
      msg: "request body should contain the updated user information ",
    });

  userModels.User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name,
        email,
        role,
      },
    }
  )
    .then((user) => {
      if (!user) return res.status(404).json({ msg: "User does not exist" });
      res.json(user);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   GET api/users/:id/logs
// @desc    Get All logs for a user specified by the id.
// @access  Public
router.get("/:id/logs", auth, (req, res) => {
  userModels.User.findById(req.params.id)
    .sort({ register_date: -1 })
    .then((user) => res.json(user.logs))
    .catch((err) => res.status(404).json({ msg: "user not found" }));
});

// @route   DELETE api/users/:userid/logs/logid
// @desc    delete one log record for a specified user
// @access  Public
router.delete("/:userid/logs/:logid", auth, (req, res) => {
  // Check for existing user

  // console.log(req.params.userid);
  userModels.User.findByIdAndUpdate(
    { _id: req.params.userid },
    {
      $pull: {
        logs: { _id: req.params.logid },
      },
    }
  )
    .then(() => {
      Log.findById(req.params.logid)
        .then((log) => {
          return log
            .remove()
            .then(() => res.json({ success: true }))
            .catch((err) => res.status(400).json({ success: false }));
        })
        .catch((err) => res.status(400).json({ msg: "log not found" }));
    })
    .catch((err) => res.status(400).json({ msg: "user not found" }));
});
module.exports = router;

// @route   POST api/users/create-oauth-user
// @desc    Registers a new oauth user which only keeps the unique id of the oauth user
//          and adds a few fields to adapt it to my app.
// @access  Public
router.post("/create-oauth-user", (req, res) => {
  const { oauthUser, oauthProvider } = req.body;

  const uniqueId = oauthUser.id;
  // console.log(oauthUser);
  // Check for existing user
  userModels.OauthUser.findOne({ uniqueId }).then((user) => {
    // if user is already in my database it means that it has been adapted before, simply pass it through.
    if (user) return res.json(user);

    const newOauthUser = new userModels.OauthUser({
      uniqueId,
      ...oauthUser,
    });

    newOauthUser
      .save()
      .then((oauthUser) => res.json(oauthUser))
      .catch((err) =>
        // res.status(400).json({ msg: "oauth user registration failed" })
        res.status(400).json(err)
      );
  });
});
