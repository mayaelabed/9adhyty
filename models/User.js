const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
    {
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
      role: {
            type: String,
            enum: ['admin', 'client'],
        },
    },
    
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const User=mongoose.model("users", UserSchema)
module.exports=User;