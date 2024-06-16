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
    const game = await Game.findOne({ gameid: gameid }); // Corrige a busca pelo campo gameid

    if (!game) {
      return res.status(404).json({ success: 0, message: "Game not found" });
    }

    res.status(200).json({ success: 1, data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: "Internal Server Error" });
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
    return res.status(200).send({ success: 1 , game: game});
  } catch (err) {
    return res.status(500).send({ error: err, message: err.message });
  }
};



const compareHardware = (userValue, gameValue) => {
  const ratio = userValue / gameValue;
  let score, subtitle;

  if (ratio >= 1.5) {
    score = 5;
    subtitle = 'Excellent: Your hardware is well above the game requirements, providing a superior experience.';
  } else if (ratio >= 1.2) {
    score = 4;
    subtitle = 'Very Good: Your hardware is above the game requirements, ensuring a very smooth experience.';
  } else if (ratio >= 1.0) {
    score = 3;
    subtitle = 'Good: Your hardware meets the game requirements, providing a good experience.';
  } else if (ratio >= 0.8) {
    score = 2;
    subtitle = 'Fair: Your hardware is slightly below the game requirements, which might result in a reduced experience.';
  } else {
    score = 1;
    subtitle = 'Poor: Your hardware is significantly below the game requirements, resulting in a poor experience.';
  }

  return { score, subtitle };
};

const compareOSCompatibility = (userOS, gameOS) => {
  const osMatch = userOS === gameOS;
  const osSubtitle = osMatch ? "OS Compatible" : "OS Incompatible";
  return { osMatch, osSubtitle };
};


exports.GameCompatibility = async (req, response) => {
  const { gameid, userEmail } = req.body;

  try {
    // Verifica se o usuário com o email fornecido existe
    const userRes = await axios.get(`http://localhost:3001/user/verify/${userEmail}`);
    const { success: userSuccess, data: userData } = userRes.data;

    if (userSuccess === 1) {
      // Verifica se o jogo com o gameid fornecido existe
      const gameRes = await axios.get(`http://localhost:3002/game/verify/${gameid}`);
      const { success: gameSuccess, data: gameData } = gameRes.data;

      if (gameSuccess === 1) {

        const osCompatibility = compareOSCompatibility(userRes.data.user.specs.ostype, gameRes.data.game.ostype);
        // Calcula a compatibilidade do hardware
        const cpuCompatibility = compareHardware(userRes.data.user.specs.cpuId, gameRes.data.game.cpuId);
        const gpuCompatibility = compareHardware(userRes.data.user.specs.gpuId, gameRes.data.game.gpuId);
        const ramCompatibility = compareHardware(userRes.data.user.specs.ram, gameRes.data.game.ram);

        

        // Cria a resposta com os dados do usuário, do jogo e as pontuações
        const result = {
          success: 1,
          user: userData,
          game: gameData,
      
          cpuSubtitle: cpuCompatibility.subtitle,
          
          gpuSubtitle: gpuCompatibility.subtitle,

          ramSubtitle: ramCompatibility.subtitle,

          osMatch: osCompatibility
          
        };

        return response.status(201).json(result);
      } else {
        return response.status(404).json({ success: 0, message: "Game not found" });
      }
    } else {
      return response.status(404).json({ success: 0, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: 0, message: "Internal Server Error", error: error.message });
  }
};


// exports.AddToCart = async (req,res) => {
//   console.log(req.body);
// }