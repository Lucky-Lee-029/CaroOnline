// Models
const Game = require("../../models/Game");

async function storeGame(req, res) {
  try {
    const newGame = new Game(req.body);
    await newGame.save();

    res.status(201).json({ newGame });
  } catch (err) {
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
      .populate({
        path: "loser",
        populate: {
          path: "profile"
        }
      })
      .populate({
        path: "winner",
        populate: {
          path: "profile"
        }
      })
    res.json({
      games
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
}

async function getMatches(req, res) {
  try {
    const game = await Game.find({
      $or: [
        { loser: req.user.id },
        { winner: req.user.id }
      ]
    });

    res.json({
      matches: game.length
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
}

module.exports = {
  storeGame,
  getGame,
  getMatches
}