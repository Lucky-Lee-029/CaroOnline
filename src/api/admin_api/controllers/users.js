// models
const User = require("../../models/User");

const getUsers = async (req, res) => {
  try {
    const users = User.find()
      .select("-password")
      .populate("profile");
    res.json({ users });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

const getUserDetail = async (req, res) => {
  try {
    const user = User.findById(req.params.id)
      .select("-password")
      .populate("profile");
    res.json({ user });
  } catch (err) {
    res.status(500).json({
      msg: "server error"
    });
  }
}

module.exports = {
  getUsers,
  getUserDetail
}