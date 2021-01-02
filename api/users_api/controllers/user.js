const bcrypt = require("bcrypt");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

async function register(req, res) {
  try {
    const {
      username,
      password,
      email,
      nickname
    } = req.body;

    // Create new profile
    const newProfile = new Profile({ email, nickname });
    await newProfile.save();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashPassword,
      profile: newProfile._id
    });
    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

module.exports = {
  register
}