/* eslint-disable no-undef */
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const TFASchema = new Schema({
  secret: {
    type: String,
    required: true
  },
  dataURL: {
    type: String,
    required: true
  },
  TFAURL: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date_established: {
    type: Date,
    default: Date.now
  }
});

// eslint-disable-next-line no-multi-assign
module.exports = TFA = mongoose.model("TFA", TFASchema);
