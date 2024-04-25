const { Schema, model} = require("mongoose");

const blacklistTokenSchema = new Schema({
    token: { type: String, required: true },
    expiration: { type: Date, required: true }
},
{ timestamps: true},
);

const blacklistTokenModel = model("blacklistToken",blacklistTokenSchema);

module.exports = blacklistTokenModel;