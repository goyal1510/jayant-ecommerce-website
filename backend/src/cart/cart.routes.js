// routes/cart.routes.js
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const Cart = require("./cart.model");
const mongoose = require("mongoose");

// Route to get all cart items for a user.
router.get("/", verifyToken, async (req, res) => {
    try {
        // Find cart items by user ID.
        const cartItems = await Cart.find({ userId: req.userId });
        console.log("cart items : ", cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

// Route to add an item to the cart.
router.post("/add", verifyToken, async (req, res) => {
    const { productId, name, price, image, quantity } = req.body;
    const userId = req.userId;

    try {
        // Check if the item already exists in the cart.
        let cartItem = await Cart.findOne({ userId, productId });
        console.log("cart items : ", cartItem);

        if (cartItem) {
            // If the item exists, increment the quantity.
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // If the item does not exist, create a new cart item.
            cartItem = new Cart({ userId, productId, name, price, image, quantity });
            await cartItem.save();
        }

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ error: "Error adding to cart" });
    }
});

// Route to remove an item from the cart.
router.delete("/remove/:id", verifyToken, async (req, res) => {
    try {
        // Find and delete a cart item by user ID and product ID.
        await Cart.findOneAndDelete({ userId: req.userId, productId: req.params.id });
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
});

// Route to update the quantity of an item in the cart.
router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        console.log("Received request to update cart:", req.params.id, req.body);
        console.log("User ID:", req.userId);

        const { quantity } = req.body;
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        // Find and update a cart item by user ID and product ID.
        const cartItem = await Cart.findOneAndUpdate(
            { userId: req.userId, productId: new mongoose.Types.ObjectId(req.params.id) },
            { quantity },
            { new: true }
        );

        if (!cartItem) {
            console.error("Cart item not found for product:", req.params.id);
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart updated", cartItem });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Error updating cart", error });
    }
});

// Route to clear the entire cart for a user.
router.delete("/clear", verifyToken, async (req, res) => {
    try {
        // Delete all cart items for a user.
        await Cart.deleteMany({ userId: req.userId });
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
});

module.exports = router;