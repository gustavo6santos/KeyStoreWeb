// Imports
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");


// Models
const Game = require("../models/productModel");
const Counter = require('../models/counter');
const multer = require("multer");

// Create a game
exports.createGame = async (req, res) => {
  const { gameid, title, image, price, genre, description, category ,stock, ram, cpuModel, gpuModel, ostype } = req.body;

  // Validations
  if (!title) {
    return res.status(422).json({ msg: "Title is mandatory!" });
  }

  if (!image) {
    return res.status(422).json({ msg: "Title is mandatory!" });
  }

  if (!price) {
    return res.status(422).json({ msg: "Price is mandatory!" });
  }
  if (!genre) {
    return res.status(422).json({ msg: "Genre is mandatory!" });
  }
  if (!description) {
    return res.status(422).json({ msg: "Description is mandatory!" });
  }
  if (!category) {
    return res.status(422).json({ msg: "Genre is mandatory!" });
  }
  if (!stock) {
    stock = 0;
  }

  if(category === "Pc") {
    if (!ram) {
      return res.status(422).json({ msg: "Ram is mandatory!" });
    }
    if (!cpuModel) {
      return res.status(422).json({ msg: "Cpu Model is mandatory!" });
    }
    if (!gpuModel) {
      return res.status(422).json({ msg: "Gpu Model is mandatory!" });
    }
    if (!ostype) {
      return res.status(422).json({ msg: "OS Type is mandatory!" });
    }

    let count = await Game.countDocuments();
    let gameid = count + 1; // Initial gameid

    // Check if the generated gameid already exists, and increment until a unique id is found
    while (await Game.exists({ gameid })) {
      gameid += 1;
    }

    const game = new Game({
      gameid,
      title,
      image,
      price,
      genre,
      description,
      category,
      stock,
      ram,
      cpuModel,
      gpuModel,
      ostype
    });
    try {
      await game.save();
      res.status(201).json({success: true, msg: "Game created with success!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Internal Server Error" });
    } 
  } else {
  
    let count = await Game.countDocuments();
    let gameid = count + 1; // Initial gameid

    // Check if the generated gameid already exists, and increment until a unique id is found
    while (await Game.exists({ gameid })) {
      gameid += 1;
    }

  const game = new Game({
    gameid,
    title,
    image,
    price,
    description,
    genre,
    category,
    stock
  });
  try {
    await game.save();
    res.status(201).json({success:true, msg: "Game created with success!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
  }
  
};

exports.getGame = async (req, res) => {
  try {
    const gameid = req.params.id;
    const game = await Game.findOne({ gameid: gameid });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    if (!games) {
      return res.status(404).json({ message: "No Results" });
    }
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.editgame = async (req, res) => {
  try {
    const gameid = new mongoose.Types.ObjectId(req.params.id);
    console.log(gameid)

    const { title, image, price, genre, description, category, stock, ram, cpuModel, gpuModel, ostype } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      gameid,
      {
        title,
        image,
        price,
        genre,
        description,
        category,
        stock,
        ram,
        cpuModel,
        gpuModel,
        ostype,
      },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ msg: "Game Updated with success!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyGameById = async (req, res) => {
  try {
    // req.params
    let gameid = req.params.id;

    const game = await Game.findOne({gameid: gameid});
    if (!game) {
      return res.status(404).json({ success: 0 });
    }

    // Send response
    return res.status(200).send({ success: 1 });
  } catch (err) {
    return res.status(500).send({ error: err, message: err.message });
  }
};


exports.GameCompatibility = async (req, res) => {

  
    

};

// exports.AddToCart = async (req,res) => {
//   console.log(req.body);
// }