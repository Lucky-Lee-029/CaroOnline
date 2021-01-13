// Models
const Game = require("../../models/Game");

async function getWinRate(req, res) {
  try {
    const game = await Game.find({
      $or: [
        { loser: req.user.id },
        { winner: req.user.id }
      ]
    });

    const winGame = await Game.find({
      winner: req.user.id
    });

    res.json({
      rate: winGame.length / game.length * 100
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

module.exports = {
  getWinRate
}