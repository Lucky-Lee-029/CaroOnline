const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model("profile", ProfileSchema);