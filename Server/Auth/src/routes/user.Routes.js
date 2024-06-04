const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const log = require("../middlewares/log");
const auth = require("../middlewares/auth");

// Routes
router.post("/user/login", log.logMiddleware, usersController.login);
router.post("/user/register", log.logMiddleware, usersController.register);
router.get("/user/:id", auth.required, log.logMiddleware, usersController.getUser);
router.get("/user/verify/:email", usersController.verifyUserByEmail);
router.post("/user/addGame", usersController.addGame);
router.post("/user/addtocart", auth.required, usersController.AddToCart);
router.post("/user/remotefromcart", auth.required, usersController.RemoveFromCart);
router.post("/user/getcart", auth.required, usersController.GetCart);
router.post("/user/clearcart", auth.required, usersController.ClearCart);

router.get("/", log.logMiddleware, (req, res) => {
  try {
    return res.status(200).json({ msg: "Welcome to our API" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error on the Server! Try agian later!" });
  }
});

module.exports = router;
 

 