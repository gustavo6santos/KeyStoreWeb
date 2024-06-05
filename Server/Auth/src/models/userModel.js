const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  order_id: String,
  cart: Object,
  games: [Object],
  specs: {
    cpuModel: String,
    gpuModel: String,
    ram: Number,
    ostype: String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
