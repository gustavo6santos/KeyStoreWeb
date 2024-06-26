// Imports
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');


// Models
const User = require("../models/userModel");
const { response } = require("express");

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ success: false, msg: "Email is mandatory!" });
  }

  if (!password) {
    return res.status(422).json({ success: false, msg: "Password is mandatory!" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ success: false, msg: "Invalid email!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ success: false, msg: "Invalid password!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: user._id }, secret, 
    //  { expiresIn: "5m" }
  );

    return res.status(200).json({ success: true, msg: "Authentication completed successfully!", token, email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Error on the Server! Try again later!" });
  }
};

// Register logic
exports.register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name) {
    return res.status(422).json({ success: false, msg: "Name is mandatory!" });
  }

  if (!email) {
    return res.status(422).json({ success: false, msg: "Email is mandatory!" });
  }

  if (!password) {
    return res.status(422).json({ success: false, msg: "Password is mandatory!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ success: false, msg: "Passwords don't match!" });
  }

  if (!/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
    return res.status(422).json({ success: false, msg: "Invalid Email!" });
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ success: false, msg: "Email already in use. Please use another email!" });
  }

  if (password.length < 8) {
    return res.status(422).json({ success: false, msg: "Password is too short!" });
  } else if (!/[A-Z]/.test(password)) {
    return res.status(422).json({ success: false, msg: "Password must have an upper case character!" });
  } else if (!/[0-9]/.test(password)) {
    return res.status(422).json({ success: false, msg: "Password must have a number!" });
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(422).json({ success: false, msg: "Password must have a special character!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  let cart = {};
  for(let i = 0;i < 300; i++){
    cart[i]=0;
  }

  const user = new User({ 
    name, 
    email, 
    password: passwordHash,
    cart 
    });

  try {
    await user.save();
    return res.status(201).json({ success: true, msg: "User created with success!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Error on the Server! Try again later!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // req.params
    let id = req.params.id;

    // Check if user exists
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).send({ success: 0, message: "User not found!" });
    }

    // Build response
    let response = {
      success: 1,
      length: user.length,
      results: {
        id: user.id,
        email: user.email,
        name: user.name,
        order_id: user.order_id
      },
    };

    // Send response
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({ error: err, message: err.message });
  }
};

exports.verifyUserByEmail = async (req, res) => {
  try {
    // req.params
    let email = req.params.email;

    // Check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ success: 0 });
    }

    // Send response
    return res.status(200).send({ success: 1 , user: user});
  } catch (err) {
    return res.status(500).send({ error: err, message: err.message });
  }
};

exports.addGame = async (req, res) => {
  const email = req.body.userEmail || req.headers['userEmail'];

  try {
    // Verificar se o usuário com o email fornecido existe
    const userRes = await User.findOne({ email: email });
    if (!userRes) {
      return res.status(404).send("User not found");
    }

    // Buscar os jogos do usuário
    axios
      .get(`http://localhost:3003/shop/${email}`)
      .then(async (gamesRes) => {
        const { success, shop } = gamesRes.data;
        if (success === 1) {
          const games = shop.map((item) => {
            return {
              title: item.title,
              price: item.price,
              game_key: item.game_key,
              date: item.date
            };
          });

          // Atualizar os jogos do usuário
          userRes.games = games;

          await userRes.save();
          return res.status(200).json(userRes);
        } else {
          return res.status(404).send("No games found for the user");
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send({ error: error, message: error.message });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

exports.AddToCart = async (req, response) => {

  console.log("Added", req.body.itemId)
  let userData = await User.findOne({_id:req.user.id});
  userData.cart[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id:req.user.id}, {cart:userData.cart});
  response.send("Added");

};

exports.RemoveFromCart = async (req,response) => {

  console.log("Removed", req.body.itemId)
  let userData = await User.findOne({_id:req.user.id});
  if(userData.cart[req.body.itemId]>0)
  userData.cart[req.body.itemId] -= 1;
  await User.findOneAndUpdate({_id:req.user.id}, {cart:userData.cart});
  response.send("Removed");
}

exports.GetCart = async (req,response) => {
  console.log("GetCart");
  let userData = await User.findOne({_id: req.user.id})
  response.json(userData.cart);
}

exports.ClearCart = async (req, res) => {
  try {
      let userData = await User.findOne({_id: req.user.id});
      let newCart = {};
      for (let i = 0; i < 301; i++) {
          newCart[i] = 0;
      }
      userData.cart = newCart;
      await User.findOneAndUpdate({_id: req.user.id}, {cart: newCart});
      res.send("Cart Cleared");
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error, message: error.message });
  }
};

exports.addSpecs = async (req, res) => {
  const email = req.headers['useremail']; // Accessing the header in lowercase
 // Log the received email for debugging

  try {
    // Verify if the user with the provided email exists
    const userRes = await User.findOne({ email: email });
    if (!userRes) {
      console.log('User not found for email:', email); // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's specs
    const { cpuModel, gpuModel, ram, ostype } = req.body;
    userRes.specs = {
      cpuModel,
      gpuModel,
      ram,
      ostype
    };

    await userRes.save();
    return res.status(200).json(userRes); // Send JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" }); // Send JSON error response
  }
};