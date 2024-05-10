const User = require("../models/User");
const ProductModel = require("../models/ProductModel");
const Category = require("../models/categoryModel");

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

module.exports = {
    numberUser,
    numberProduct,
    numberCategory
}