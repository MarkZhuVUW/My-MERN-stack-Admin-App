// google two-factor authenticator.
const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const TFA = require('../../models/TFA');
const userModels = require('../../models/User');

// @route   POST api/TFA/setup
// @desc    Get setup TFA for the user
// @access  Private
router.post('/', (req, res) => {
  const {email} = req.body;
  TFA.findOne({email})
      .then((TFA) => {
        if (!TFA) {
          return res.status(400).json({msg: 'TFA document Does not exist'});
        }
        res.send(TFA);
      })
      .catch((err) => res.status(400).json({msg: err}));
});

// @route   POST api/TFA/setup
// @desc    construct TFA setup and save it to db for the user
// @access  Private
router.post('/setup', (req, res) => {
  const {email, domainName, isOauth, uniqueId} = req.body;

  const lookup = isOauth ? uniqueId : email;
  userModels.User.findOne({lookup})
      .then((user) => {
        if (!user) {
        // return 400 if user does not even exist.
          return res.status(400).json({msg: 'user does not even exist!'});
        }
      })
      .catch((err) => res.status(400).json({msg: err}));

  TFA.findOne({email})
      .then((TFADoc) => {
        if (TFADoc) return res.status(400).json({msg: 'TFA already exists'});
        // if tfa does not exist, create a new one and send it out as response.
        const secret = speakeasy.generateSecret({
          length: 10,
          name: email,
          issuer: 'My Admin App',
        });
        const url = speakeasy.otpauthURL({
          secret: secret.base32,
          label: email,
          issuer: domainName,
          encoding: 'base32',
        });
        QRCode.toDataURL(url, (err, dataURL) => {
          const newTFA = new TFA({
            secret: secret.base32,
            dataURL: dataURL,
            TFAURL: url,
            email: email,
          });
          newTFA
              .save()
              .then((data) => {
                TFA.findOne({email}).then((TFADoc) => res.send(TFADoc));
              })
              .catch((err) => res.status(400).json({msg: err}));
        });
      })
      .catch((err) => res.status(400).json({msg: err}));
});

// @route   DELETE api/TFA/setup
// @desc    Delete a TFA document
// @access  Private
router.delete('/setup', (req, res) => {
  const {email} = req.body;

  TFA.findOne({email})
      .then((TFA) => TFA.remove().then(() => res.json({success: true})))
      .catch((err) => res.status(404).json({success: false, msg: err}));
});

// @route   POST api/TFA/verify
// @desc    verify TFA.
// @access  Private
router.post('/verify', (req, res) => {
  const {email, code, TFA} = req.body;
  // var token = speakeasy.totp({
  //   secret: TFA.secret,
  //   encoding: "base32"
  // });

  TFA.findOne({email})
      .then((TFA) => {
        const isVerified = speakeasy.totp.verify({
          secret: TFA.secret,
          encoding: 'base32',
          token: code,
        });

        if (isVerified) {
          return res.status(200).json({
            msg: 'verification successfull',
          });
        } else {
          return res.status(400).json({
            msg:
            'verification unsuccessfull. Probably because wrong code is provided',
          });
        }
      })
      .catch((err) => {
        res.status(403).json({
          msg: err,
        });
      });
});

module.exports = router;
