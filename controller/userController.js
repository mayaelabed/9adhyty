const User = require("../models/User");
const { hashPassword }  = require("../tools/authTool");

const create = async (req,res,next)=>{
    try{
        
        const {fullname,email,password} = req.body;
        const user = await User.create({
            fullname,
            email,
            password: hashPassword(password)
        });

        

        if(user){
            return res.status(201).send("User Register Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        next(err);
    }
}

//get all
const getAllUser = async (req,res,next)=>{
    try{
    const users = await User.find().select('-password');

    
    if(users.length >0){
        return res.status(200).send(users);
    }

    return res.status(404).send("user Not Found");

    }catch(err){
        next(err);
    }

}

//udpate 
const updateUser = async (req,res,next)=>{
    try{
    const updatedUser = await User.updateOne({_id:req.params.id},{
        $set:{
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashPassword(req.body.password),
            role: req.body.role
        }
    });

    if(updatedUser){
        return res.status(200).send("user updated Successfully");
    }
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteUser = async (req,res,next)=>{
    try{
    const deleteUser = await User.findByIdAndDelete({_id:req.params.id});

    if(deleteUser){
        return res.status(200).send("user Deleted Successfully");
    }

    return res.status(404).send("user Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getUserById = async (req,res,next)=>{
    try{
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        return res.status(200).send(user);
    }
    return res.status(404).send("Not user Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


module.exports = {create,getAllUser,updateUser,deleteUser,getUserById};