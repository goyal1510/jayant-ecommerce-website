const verifyAdmin = (req, res, next) => {
    // Check if the user's role is not 'admin'.
    if (req.role !== 'admin') {
        // If the user's role is not 'admin', send a 403 Forbidden response.
        return res.status(403).send({ success: false, message: "Your are not authorized to perform this action" });
    }
    // If the user's role is 'admin', proceed to the next middleware or route handler.
    next();
};

module.exports = verifyAdmin;