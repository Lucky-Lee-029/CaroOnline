const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// models
const User = require("../../models/User");

const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({
      msg: "user does not exist"
    });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // new token
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
      msg: "invalid credentials"
    });
  }
}

module.exports = {
  verifyToken,
  login
}