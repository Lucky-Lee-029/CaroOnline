const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  chats: [
    {
      content: {
        type: String
      },
      time: {
        type: Date
      },
      username: {
        type: String
      }
    }
  ],
  cup: {
    type: Number,
    required: true
  },
  loser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user"
  },
  winner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user"
  },
  timeEnd: {
    type: Date,
    required: true
  },
  history: [
    {
      type: mongoose.SchemaTypes.Mixed
    }
  ]
});

module.exports = mongoose.model("game", GameSchema);