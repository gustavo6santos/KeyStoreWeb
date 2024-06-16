const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '..', 'upload', 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`);
    } 
});

const upload = multer({ storage: storage });

// Routes for product operations
router.post("/create", productController.createGame);
router.get("/games/:id", productController.getGame);
router.get("/games", productController.getGames);
router.put("/games/edit/:id", productController.editgame);
router.delete("/games/delete/:id", productController.deleteGame);
router.get("/game/verify/:id", productController.verifyGameById);
router.post("/game/GameCompatibility", productController.GameCompatibility);
//router.post("/game/AddToCart", productController.AddToCart);


// Serve static files
router.use('/images', express.static(uploadDir));

// Image upload endpoint
router.post("/upload", upload.single('product'), (req, res) => {
    res.json({ success: 1, image_url: `http://localhost:3002/images/${req.file.filename}` });
});

module.exports = router;