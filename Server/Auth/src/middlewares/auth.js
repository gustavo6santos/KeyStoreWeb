// Imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.required = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Ensure 'SECRET' matches the secret key used when generating the token
    req.user = decoded; // Attach user information to the request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token." });
  }
};

