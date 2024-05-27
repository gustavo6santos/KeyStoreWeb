const mongoose = require("mongoose");

const Game = mongoose.model("Game", {
  gameid: Number,
  title: String,
  image: String,
  price: Number,
  genre: String,
  category: String,
  stock: Number,
  ram: Number,
  cpuModel: String,
  gpuModel: String,
  ostype: String,
});

module.exports = Game;
