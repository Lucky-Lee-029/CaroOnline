// Models
const Game = require("../../models/Game");

async function storeGame(req, res) {
  try {
    // Store game
    console.log("Save game");
    console.log(req.body);
    const newGame = new Game(req.body);
    await newGame.save();

    res.status(201).json({ newGame });
  } catch (err) {
    console.log(false);
    console.log(err);
    res.status(500).json({
      msg: "Server error"
    });
  }
}

async function getGame(req, res) {
  try {
    const { id, userId } = await req.query;
    const games = await Game.find({
      $or: [
        { _id: id },
        { loser: userId },
        { winner: userId }
      ]
    })
    .populate("loser")
    .populate("winner");

    res.json({
      games
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
}

module.exports = {
  storeGame,
  getGame
}