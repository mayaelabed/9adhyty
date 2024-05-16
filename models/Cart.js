const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Schema
const CartSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
      type: Number,
      default: 0
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = Mongoose.model('Cart', CartSchema);
