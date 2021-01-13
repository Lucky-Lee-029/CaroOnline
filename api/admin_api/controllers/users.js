// models
const User = require("../../models/User");

async function getUsers(req, res) {
  try {
    const users = await User.find().populate("profile");
    res.json({ users });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

async function getUserDetail(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("profile");
    res.json({ user });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

module.exports = {
  getUsers,
  getUserDetail
}