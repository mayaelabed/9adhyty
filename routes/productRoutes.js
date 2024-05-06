const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController");
const fileStorage = require("../tools/fileStorage");

productRouter.get("/all",productController.getAllProductModel);
productRouter.post("/create",fileStorage.upload,productController.create);
productRouter.put("/update/:id",fileStorage.upload,productController.updateProductModel);
productRouter.delete("/delete/:id",productController.deleteProductModel);
productRouter.get("/:id",productController.getProductModelById);


module.exports = productRouter;

