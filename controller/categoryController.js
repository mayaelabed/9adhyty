const Category = require("../models/categoryModel");

const create = async (req,res,next)=>{
    try{
        
        const {name,description} = req.body;
        const category = await Category.create({
            name,
            description
        });

        

        if(category){
            return res.status(201).send("category created Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        next(err);
    }
}

//get all
const getAllCategoryModel = async (req,res,next)=>{
    try{
    const category = await Category.find();

    
    if(category.length >0){
        return res.status(200).send(category);
    }

    return res.status(404).send("category Not Found");

    }catch(err){
        next(err);
    }

}

//udpate 
const updateCategoryModel = async (req,res,next)=>{
    try{
    const updateCategory= await Category.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description
        }
    });

    if(updateCategory){
        return res.status(200).send("Category updated Successfully");
    }
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteCategoryModel = async (req,res,next)=>{
    try{
    const deleteCategory = await Category.findByIdAndDelete({_id:req.params.id});

    if(deleteCategory){
        return res.status(200).send("Category Deleted Successfully");
    }

    return res.status(404).send("Category Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getCategoryModelById = async (req,res,next)=>{
    try{
    const category = await Category.findById(req.params.id);

    if(category){
        return res.status(200).send(category);
    }
    return res.status(404).send("Not category Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


module.exports = {create,getAllCategoryModel,updateCategoryModel,deleteCategoryModel,getCategoryModelById};