const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = TFA = mongoose.model("TFA", TFASchema);
