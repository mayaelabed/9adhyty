const User = require("../models/User");
const blacklistTokenModel = require("../models/blacklistTokenModel");
const {hashPassword, verifyPassword, generateToken} = require("../tools/authTool");
const jwt = require("jsonwebtoken");
const multer = require("multer");


// Configure multer for file upload the logic goes here for the file upload
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
    },
  });
const upload = multer({ storage }).single("image");


const register = async (req,res,next)=>{
    try{
        
        const {fullname,email,password,image} = req.body;
        const user = await User.create({
            fullname,
            email,
            password: hashPassword(password),
            image: req.file.filename
        });

        if(user){
            return res.status(201).send("User Register Successfully");
        }

        return res.status(406).send("Something Worng !!");
    }catch(err){
        next(err);
    }
}


const login =  async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        
        const user =  await User.findOne({email:email});
        
        if(!user || !verifyPassword(password,user.password)){
            return res.status(404).send("Email or password is invalid !!");
        }
        
        const token = generateToken({email});
        const {password: pass, ...other} = user._doc;
       
        res.status(200).send({
            message: "successfully logged in",
            other,
            token
        });

    }catch(err){
        next(err);
    }

}

const logout = async (req,res,next)=>{

    try{
    const token = req.headers['authorization'].split(' ')[1];
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); 
    
    const blacklistToken =  await blacklistTokenModel.create({
        token,
        expiration
    });

    return res.send('Logged out successfully.');
}catch(err){
    next(err);
}
}




module.exports = {
    register,
    login,
    logout,
    upload
}