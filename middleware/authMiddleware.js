const jwt = require('jsonwebtoken'); // Import the JSON Web Token library
const User = require('../models/User'); // Import the User model

/**
 * @desc Middleware to protect routes
 * This middleware ensures that only authenticated users can access certain routes.
 */
const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header and remove 'Bearer ' prefix
    const token = req.header('Authorization').replace('Bearer ', '');

    // If no token is provided, respond with a 401 status (Unauthorized)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by the ID from the decoded token, excluding the password field
        req.user = await User.findById(decoded.id).select('-password');
        next(); // Call the next middleware or route handler
    } catch (err) {
        // If the token is not valid, respond with a 401 status (Unauthorized)
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware; // Export the authMiddleware function
