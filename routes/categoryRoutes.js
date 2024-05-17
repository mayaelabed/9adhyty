const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controller/categoryController");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");

categoryRouter.get("/all",categoryController.getAllCategoryModel);
categoryRouter.post("/create",checkAuth,authorizeAdmin,categoryController.create);
categoryRouter.put("/update/:id",checkAuth,authorizeAdmin,categoryController.updateCategoryModel);
categoryRouter.delete("/delete/:id",checkAuth,authorizeAdmin,categoryController.deleteCategoryModel);
categoryRouter.get("/:id",checkAuth,authorizeUser,categoryController.getCategoryModelById);


module.exports = categoryRouter;

