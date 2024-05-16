const Cart = require("../models/Cart");
const Product = require("../models/ProductModel");

const addToCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find or create a cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId });
        }

        // Find the product
        const product = await Product.findById(productId);
        

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update cart with product and quantity
        cart.products.push(productId);
        cart.quantity += quantity;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (err) {
        next(err);
    }
}

const removeFromCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Remove the product from the cart
        const index = cart.products.findIndex(item => item.product.toString() === productId);

        if (index === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const quantityRemoved = cart.products[index].quantity;
        cart.products.splice(index, 1);
        cart.quantity -= quantityRemoved;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addToCart,
    removeFromCart
}
