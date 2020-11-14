const express = require("express");

const router = express.Router();
const swaggerDocs = require("./swagger.json");
// @route   GET api/swagger/
// @desc    Get swagger ui documentations
// @access  Private
router.get("/", (req, res) => {
  res.send(swaggerDocs);
});

module.exports = router;
