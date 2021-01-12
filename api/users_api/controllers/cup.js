// Models
const User = require("../../models/User");

async function updateCup(req, res) {
  cosole.log("updata cup");
  try {
    const { cup } = await req.body;
    
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { cup }
    });

    res.json({
      msg: "Update user.cup successfullly"
    });
    console.log(cup);
  } catch (err) {
    console.log("update cup fail");
    res.status(500).json({
      msg: "Server error"
    });
  }
}

module.exports = {
  updateCup,
}