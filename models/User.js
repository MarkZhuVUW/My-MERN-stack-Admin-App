const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Log = require("./Log");
// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  logs: [Log.schema],

  register_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ["admin", "guest"],
    required: true,
    default: "guest"
  }
});

module.exports = User = mongoose.model("user", UserSchema);
