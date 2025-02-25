const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token from cookies.
const verifyToken = (req, res, next) => {
    try {
        // Check if cookies are present in the request.
        if (!req.cookies) {
            return res.status(401).send({ message: "No cookies found" });
        }

        // Extract the token from the cookies.
        const token = req.cookies.token;

        // Check if the token exists.
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }

        // Verify the token using the JWT secret.
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the user ID and role to the request object.
        req.userId = decoded.userId;
        req.role = decoded.role;

        // Proceed to the next middleware or route handler.
        next();
    } catch (error) {
        // Handle token expiration error.
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired" });
        }

        // Handle invalid token error.
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "Invalid token" });
        }

        // Log and handle other errors.
        console.log("Error while verifying token:", error);
        res.status(500).send({ message: "Error while verifying token" });
    }
};

module.exports = verifyToken;