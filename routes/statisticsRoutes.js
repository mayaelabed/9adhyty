const express = require("express");
const statisticsRouter = express.Router();
const statisticsController = require("../controller/statisticsController");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");

statisticsRouter.get("/number-user",checkAuth,authorizeAdmin,statisticsController.numberUser);
statisticsRouter.get("/number-product",checkAuth,authorizeAdmin,statisticsController.numberProduct);
statisticsRouter.get("/number-category",checkAuth,authorizeAdmin,statisticsController.numberCategory);
statisticsRouter.get("/number-order",checkAuth,authorizeAdmin,statisticsController.numberOrder);
statisticsRouter.get("/number-cart",checkAuth,authorizeAdmin,statisticsController.numberCart);

module.exports = statisticsRouter;