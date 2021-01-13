// Models
const User = require("../../models/User");

async function updateCup(req, res) {
  try {
    const { cup } = await req.body;

    const user = await User.findByIdAndUpdate(req.params.id, {
      $inc: { cup }
    });

    res.json({
      msg: "Update user.cup successfullly"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
}

module.exports = {
  updateCup,
}