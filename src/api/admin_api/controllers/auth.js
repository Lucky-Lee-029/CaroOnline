const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// models
const Admin = require("../../models/Admin");

const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json({ admin });
  } catch (err) {
    res.status(404).json({
      msg: "admin does not exist"
    });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      // new token
      const token = jwt.sign(
        { id: admin._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      res.json({ admin, token });
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