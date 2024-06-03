const mongoose = require("mongoose");

const Shop = mongoose.model("Shop", {
  gameid: String,
  userEmail: String,
  price: Number,
  title: String,
  date: Date,
  game_key: String,
});

module.exports = Shop;
