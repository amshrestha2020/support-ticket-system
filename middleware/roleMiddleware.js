/**
 * @desc Middleware to check user roles
 * This middleware ensures that only users with specific roles can access certain routes.
 * @param {Array} roles - Array of roles allowed to access the route
 * @returns {Function} - Middleware function
 */


const roleMiddleware = (roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles array
        if (!roles.includes(req.user.role)) {
            // If the user's role is not allowed, respond with a 403 status (Forbidden)
            return res.status(403).json({ message: 'Access denied' });
        }
        next(); // Call the next middleware or route handler
    };
};

module.exports = roleMiddleware; // Export the roleMiddleware function
