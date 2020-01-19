const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  date_logged: {
    type: Date,
    default: Date.now
  }
});

module.exports = Log = mongoose.model("log", LogSchema);
