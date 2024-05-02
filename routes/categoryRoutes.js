const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controller/categoryController");

categoryRouter.get("/all",categoryController.getAllCategoryModel);
categoryRouter.post("/create",categoryController.create);
categoryRouter.put("/update/:id",categoryController.updateCategoryModel);
categoryRouter.delete("/delete/:id",categoryController.deleteCategoryModel);
categoryRouter.get("/:id",categoryController.getCategoryModelById);


module.exports = categoryRouter;

