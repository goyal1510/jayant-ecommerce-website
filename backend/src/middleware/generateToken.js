const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
require('dotenv').config();

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User Not Found');
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        return null;  // Return null instead of undefined
    }
};

module.exports = generateToken;
