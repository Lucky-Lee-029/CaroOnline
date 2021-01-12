const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    enum: ["local", "facebook", "google"],
    default: "local"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  active: {
    type: Boolean,
    default: true
  },
  local: {
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  facebook: {
    type: String,
    trim: true
  },
  google: {
    type: String,
    trim: true
  },
  profile: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "profile",
    required: true
  },
  cup: {
    type: Number,
    min: 0,
    default: 100
  },
  ranking: {
    type: String,
    enum: [
      "none",
      "F", "E", "D", "C", "B", "A", "S"
    ],
    default: "none"
  }
});

module.exports = mongoose.model("user", UserSchema);