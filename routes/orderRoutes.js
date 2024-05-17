const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/orderController");

orderRouter.post("/make",orderController.makeOrder);
orderRouter.get("/all",orderController.allOrder);

module.exports = orderRouter;