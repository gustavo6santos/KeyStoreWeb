// Imports
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/userModel");

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

    return res.status(200).json({ success: true, msg: "Authentication completed successfully!", token });
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

  const user = new User({ name, email, password: passwordHash });

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
    return res.status(200).send({ success: 1 });
  } catch (err) {
    return res.status(500).send({ error: err, message: err.message });
  }
};


exports.addOrderId = async (req, response) => {

  const { userEmail, order_id } = req.body;
  // Check if the user with the provided email exists
  try {
    const userRes = await User.findOne({ userEmail });
    if (userRes) {
      // Update the user's orderid
      userRes.order_id = order_id;

      try {
        await userRes.save();
        return response.status(200).json(userRes);
      } catch (error) {

        console.error(error);
        return response.status(500).send("Internal server error");
      }

    } else {
      return response.status(404).send("User not found");
    }
  } catch (error) {
    return response.status(500).send({ error: error, message: error.message });
  }
};