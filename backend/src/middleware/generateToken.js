const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
require('dotenv').config();

// Function to generate a JWT token for a given user ID.
const generateToken = async (userId) => {
    try {
        // Find the user by their ID.
        const user = await User.findById(userId);
        // If the user is not found, throw an error.
        if (!user) {
            throw new Error('User Not Found');
        }

        // Generate a JWT token containing the user's ID and role.
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour.
        );

        // Return the generated token.
        return token;
    } catch (error) {
        // Log any errors that occur during token generation.
        console.error("Error generating token:", error.message);
        // Return null if an error occurs.
        return null;
    }
};

module.exports = generateToken;