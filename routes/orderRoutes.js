const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/orderController");

orderRouter.post("/make",orderController.makeOrder);

module.exports = orderRouter;