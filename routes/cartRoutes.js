const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cartController");

cartRouter.post("/add",cartController.addToCart);
cartRouter.delete("/delete/:id",cartController.removeFromCart);

module.exports = cartRouter;