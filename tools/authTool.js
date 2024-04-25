const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const hashPassword = (password) => {
    
    let salt = bcrypt.genSaltSync(10); //add randomness to passwords before they are hashed.
    let hash = bcrypt.hashSync(password,salt);
    return hash;
}

const verifyPassword = (password,hashed)=>{
    return bcrypt.compareSync(password,hashed) //return true or false Sync without use await is auto
   
}

const generateToken = (payload,secret=JWT_SECRET) => {    
    
    let token = jwt.sign(payload,secret,{
        expiresIn: '1d',
    });
    return token;
   
}

const verifyToken = (token,secret=JWT_SECRET) => {
  return jwt.verify(token,secret); 
}

module.exports = {hashPassword, verifyPassword, generateToken, verifyToken};