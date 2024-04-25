const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {
        fullname:{
            type: String,
            required: "Your fullname is required"
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: true,
            max: 25,
        },
        role: { type: String, default: "USER_ROLE" },
    },
    
    { timestamps: true }
);


const User=mongoose.model("users", UserSchema);
module.exports=User;