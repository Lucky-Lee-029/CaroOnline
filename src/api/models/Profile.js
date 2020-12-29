const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  nickname: {
    type: String,
    trim: true,
    required: true
  },
  is_activated: {
    type: Boolean,
    default: false
  },
  elo: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("profile", ProfileSchema);