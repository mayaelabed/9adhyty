const User = require("../models/User");
const { verifyToken, hashPassword } = require("../tools/authTool");
const blacklistTokenModel = require("../models/blacklistTokenModel");

const checkAuth = async (req,res,next)=>{
try{
    const authHeader = req?.headers?.authorization;

    if(!authHeader){
        return res.status(404).send("ERROR: You are Not Authorized !");
    }

    const [bearer, token] = authHeader.split(' ');
    
    if(bearer && bearer.toLowerCase() === 'bearer' && token){
        const blacklistedToken = await blacklistTokenModel.findOne({ token });
   
        if (blacklistedToken && blacklistedToken.expiration > new Date()) {
            return res.status(401).send('Access denied. Token revoked.');
        }

        let verfiyResult = verifyToken(token);
        
        const user = await User.findOne({
            email: verfiyResult.email,
        }).select('-password');

        req.authenticated = !!user;

        if (!user){
            return res.status(404).send("ERROR: invalid token");
        }

        req.user = user;
        
	   next();
   
    }
}catch(err){
    //return res.status(401).send(err.message);
    next(err);
}
}

const authorizeUser = (req, res, next) => {
    try{
    if (req.user.role === 'USER_ROLE' || req.user.role === 'ADMIN_ROLE') {
        return next();
    }

    return res.status(403).send('Forbidden.');
    }catch(err){
        next(err);
    }
};

const authorizeAdmin = (req, res, next) => {
    try{
    if (req.user.role == 'ADMIN_ROLE'){
       return next(); 
    } 
    
    return res.status(403).send('Forbidden for USER_ROLE.');

    }catch(err){
        next(err);
    }
};

module.exports = {checkAuth,authorizeUser,authorizeAdmin};