const ProductModel = require("../models/ProductModel");

const create = async (req,res,next)=>{
    try{
        
        const {name,description,quantity,price,image,category} = req.body;
        const Product = await ProductModel.create({
            name,
            description,
            quantity,
            price,            
            image: req.file.filename,
            category
        });

        

        if(Product){
            return res.status(201).send("Product created Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        next(err);
    }
}

//get all
const getAllProductModel = async (req,res,next)=>{
    try{
    const Product = await ProductModel.find();

    
    if(Product.length >0){
        return res.status(200).send(Product);
    }

    return res.status(404).send("ProductModel Not Found");

    }catch(err){
        next(err);
    }

}

//udpate 
const updateProductModel = async (req,res,next)=>{
    try{
    const updateProduct = await ProductModel.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description,
            quantity:req.body.quantity,
            price:req.body.price,         
            image: req.file.filename
        }
    });

    if(updateProduct){
        return res.status(200).send("Product updated Successfully");
    }
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteProductModel = async (req,res,next)=>{
    try{
    const deleteProductModel = await ProductModel.findByIdAndDelete({_id:req.params.id});

    if(deleteProductModel){
        return res.status(200).send("ProductModel Deleted Successfully");
    }

    return res.status(404).send("ProductModel Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getProductModelById = async (req,res,next)=>{
    try{
    const Product = await ProductModel.findById(req.params.id);

    if(Product){
        return res.status(200).send(Product);
    }
    return res.status(404).send("Not Product Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


module.exports = {create,getAllProductModel,updateProductModel,deleteProductModel,getProductModelById};