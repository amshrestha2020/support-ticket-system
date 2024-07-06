const User = require('../models/User'); // Import the User model


/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Authenticated Users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

exports.getUserProfile = async (req, res) => {
    try {
        // Find the user by their ID, excluding the password field
        const user = await User.findById(req.user._id).select('-password');
        res.json(user); // Send a response with the user profile
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Update user role
 * @route PUT /api/users/role
 * @access Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

exports.updateUserRole = async (req, res) => {
    const { id, role } = req.body; // Get the user ID and new role from the request body
    try {
        // Find the user by ID and update their role, excluding the password field
        const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
        res.json(user); // Send a response with the updated user
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Get all users
 * @route GET /api/users
 * @access Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

exports.getAllUsers = async (req, res) => {
    try {
        // Find all users, excluding the password field
        const users = await User.find().select('-password');
        res.json(users); // Send a response with the list of users
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};
