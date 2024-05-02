const { Schema, model} = require("mongoose");

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    image:{
        type: String,
        required: true
    },   
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
},
{ timestamps: true},
);

const ProductModel = model("Product",productSchema);
module.exports = ProductModel;