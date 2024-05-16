const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  total: {
    type: Number,
    default: 0
  },
  updated: Date,
  orderDate: {
    type: Date,
    default: Date.now
},
});

module.exports = Mongoose.model('Order', OrderSchema);
