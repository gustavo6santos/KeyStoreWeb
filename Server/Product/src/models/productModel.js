const mongoose = require("mongoose");

const Game = mongoose.model("Game", {
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
