//import
const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");



userRouter.get("/all",checkAuth,authorizeAdmin,userController.getAllUser);
userRouter.post("/create",checkAuth,authorizeAdmin,userController.upload,userController.create);
userRouter.put("/:id",checkAuth, authorizeUser,userController.upload,userController.updateUser);
userRouter.delete("/:id",checkAuth, authorizeUser,userController.deleteUser);
userRouter.get("/:id",checkAuth,authorizeUser,userController.getUserById);



module.exports = userRouter;