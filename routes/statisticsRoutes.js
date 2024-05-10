const express = require("express");
const statisticsRouter = express.Router();
const statisticsController = require("../controller/statisticsController");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");

statisticsRouter.get("/number-user",checkAuth,authorizeAdmin,statisticsController.numberUser);
statisticsRouter.get("/number-product",statisticsController.numberProduct);
statisticsRouter.get("/number-category",statisticsController.numberCategory);

module.exports = statisticsRouter;