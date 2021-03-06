/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const mongoose = require("mongoose");

const { Schema } = mongoose;

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
  company: { type: String },
  date_logged: {
    type: Date,
    default: Date.now
  }
});

module.exports = Log = mongoose.model("log", LogSchema);
