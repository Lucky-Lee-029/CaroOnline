const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "profile",
    required: true
  }
});

module.exports = mongoose.model("user", UserSchema);