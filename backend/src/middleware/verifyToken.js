const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try {
        console.log("Cookies: ",req.cookies);
        if (!req.cookies) {
            return res.status(401).send({ message: "No cookies found" });
        }
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "Invalid token" });
        }
        console.log("Error while verifying token:", error);
        res.status(500).send({ message: "Error while verifying token" });
    }
};


module.exports = verifyToken