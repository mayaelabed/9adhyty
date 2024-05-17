const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cartController");

cartRouter.post("/add",cartController.addToCart);
cartRouter.delete("/delete",cartController.removeFromCart);

module.exports = cartRouter;