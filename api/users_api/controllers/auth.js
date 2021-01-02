const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");

async function verifyToken(req, res) {
  try {
    const user = await User.findById(req.user.id).populate("profile");
    res.json({ user });
  } catch (err) {
    res.status(404).json({
      msg: "User Does Not Exist"
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("profile");
    if (!user) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Create new token
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      res.json({ user, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).json({
      msg: "Invalid Credentials"
    });
  }
}

module.exports = {
  verifyToken,
  login
}