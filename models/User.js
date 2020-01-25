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

  register_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ["admin", "guest", "employer"],
    required: true,
    default: "guest"
  },
  company: {
    type: String
  },
  logs: [Log.schema]
});

module.exports = User = mongoose.model("user", UserSchema);
