const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/ProductModel");

const makeOrder = async (req, res, next) => {
    try {
        const { userId } = req.body;
        
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId }).populate('products');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Calculate the total based on the products in the cart
        let total = 0;
        for (const product of cart.products) {
            total += product.price * cart.quantity;
        }

        // Create the order
        const order = new Order({ 
            cart: cart._id,
            total
        });

        await order.save();

        // Clear the user's cart after placing the order
        cart.products = [];
        cart.quantity = 0;
        await cart.save();

        return res.status(200).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    makeOrder
}
