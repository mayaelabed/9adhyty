const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController");
const fileStorage = require("../tools/fileStorage");
const {checkAuth, authorizeAdmin, authorizeUser} = require("../middleware/authMiddleware");

productRouter.get("/all",productController.getAllProductModel);
productRouter.post("/create",checkAuth,authorizeAdmin,fileStorage.upload,productController.create);
productRouter.put("/update/:id",checkAuth,authorizeAdmin,fileStorage.upload,productController.updateProductModel);
productRouter.delete("/delete/:id",checkAuth,authorizeAdmin,productController.deleteProductModel);
productRouter.get("/:id",checkAuth,authorizeUser,productController.getProductModelById);


module.exports = productRouter;

