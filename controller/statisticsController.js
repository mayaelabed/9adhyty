const User = require("../models/User");
const ProductModel = require("../models/ProductModel");
const Category = require("../models/categoryModel");
const Order = require("../models/Order");
const Cart = require("../models/Cart");


//number of user in database
const numberUser = async (req,res,next)=>{
    try{
        const allUser = await User.countDocuments();
    
        return res.json({numberUser: allUser});

    }catch(err){
        next(err);
    }
  
}

//number of product in the database
const numberProduct = async (req,res,next)=>{
    try{
    const allProduct = await ProductModel.countDocuments();

    return res.json({numberProduct: allProduct});

    }catch(err){
        next(err);
    }
}

//number of category in the database
const numberCategory = async(req,res,next)=>{
    try{
    const allCategory = await Category.countDocuments();

    return res.json({numberCategory: allCategory});

    }catch(err){
        next(err);
    }

}

//number of order in the database
const numberOrder = async(req,res,next)=>{
    try{
    const allOrder = await Order.countDocuments();

    return res.json({numberOrder: allOrder});

    }catch(err){
        next(err);
    }

}

//number of cart in the database
const numberCart = async(req,res,next)=>{
    try{
    const allCart = await Cart.countDocuments();

    return res.json({numberCart: allCart});

    }catch(err){
        next(err);
    }

}


module.exports = {
    numberUser,
    numberProduct,
    numberCategory,
    numberOrder,
    numberCart
}