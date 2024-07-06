const Ticket = require('../models/Ticket'); // Import the Ticket model
const User = require('../models/User'); // Import the User model
const { sendNotification, io } = require('../utils/notification'); // Import the sendNotification and io


/**
 * @desc Create a new ticket
 * @route POST /api/tickets
 * @access Customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket({ ...req.body, createdBy: req.user._id }); // Create a new ticket with data from the request body and the ID of the user creating it
        await ticket.save(); // Save the new ticket to the database

        // Send notification to the assignee
        if (ticket.assignedTo) { // Check if the ticket has been assigned to a user
            const user = await User.findById(ticket.assignedTo); // Find the user to whom the ticket is assigned
            sendNotification(user.email, 'New Ticket Assigned', `A new ticket has been assigned to you: ${ticket.title}`); // Send notification to the assignee
        }

        res.status(201).json(ticket); // Send a response with the created ticket and status code 201 (Created)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Update a ticket
 * @route PUT /api/tickets/:id
 * @access Agent/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateTicket = async (req, res) => {
    const { id } = req.params; // Get the ticket ID from the request parameters
    try {
        const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true }); // Find the ticket by ID and update it with data from the request body, returning the new updated document

        // Send notification to the assignee
        if (ticket.assignedTo) { // Check if the ticket has been assigned to a user
            const user = await User.findById(ticket.assignedTo); // Find the user to whom the ticket is assigned
            sendNotification(user.email, 'Ticket Updated', 'A ticket assigned to you has been updated.'); // Send notification to the assignee
        }

        res.json(ticket); // Send a response with the updated ticket
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Delete a ticket
 * @route DELETE /api/tickets/:id
 * @access Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteTicket = async (req, res) => {
    const { id } = req.params; // Get the ticket ID from the request parameters
    try {
        await Ticket.findByIdAndDelete(id); // Find the ticket by ID and delete it
        res.json({ message: 'Ticket deleted' }); // Send a response with a message indicating the ticket was deleted
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Get all tickets
 * @route GET /api/tickets
 * @access Admin/Agent
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('createdBy').populate('assignedTo'); // Find all tickets and populate the 'createdBy' and 'assignedTo' fields with user data
        res.json(tickets); // Send a response with the tickets
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }); // Send a response with status code 500 (Internal Server Error) and a generic error message
    }
};



/**
 * @desc Get a ticket by ID
 * @route GET /api/tickets/:id
 * @access Authenticated Users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTicketById = async (req, res) => {
    const { id } = req.params; // Get the ticket ID from the request parameters
    try {
        const ticket = await Ticket.findById(id).populate('createdBy').populate('assignedTo'); // Find the ticket by ID and populate the 'createdBy' and 'assignedTo' fields with user data
        if (!ticket) { // Check if the ticket was found
            return res.status(404).json({ message: 'Ticket not found' }); // Send a response with status code 404 (Not Found) and a message indicating the ticket was not found
        }
        res.json(ticket); // Send a response with the ticket
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Assign a ticket to a user
 * @route PUT /api/tickets/:id/assign
 * @access Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.assignTicket = async (req, res) => {
    const { userId } = req.body; // Get the user ID from the request body
    const { id } = req.params; // Get the ticket ID from the request parameters
    try {
        const ticket = await Ticket.findById(id); // Find the ticket by ID
        if (!ticket) { // Check if the ticket was found
            return res.status(404).json({ message: 'Ticket not found' }); // Send a response with status code 404 (Not Found) and a message indicating the ticket was not found
        }
        ticket.assignedTo = userId; // Assign the ticket to the user
        await ticket.save(); // Save the updated ticket

        const user = await User.findById(userId); // Find the user by ID
        if (user) { // Check if the user was found
            sendNotification(user.email, 'Ticket Assigned', 'You have a new ticket assigned to you.'); // Send notification to the assignee


            // Emit WebSocket event to notify user
            io.emit('ticketAssigned', { userId: user._id, ticketId: ticket._id });
        }

        res.json(ticket); // Send a response with the updated ticket
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};


/**
 * @desc Update the status of a ticket
 * @route PUT /api/tickets/:id/status
 * @access Admin/Agent
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateStatus = async (req, res) => {
    const { status } = req.body; // Get the new status from the request body
    const { id } = req.params; // Get the ticket ID from the request parameters
    try {
        const ticket = await Ticket.findById(id); // Find the ticket by ID
        if (!ticket) { // Check if the ticket was found
            return res.status(404).json({ message: 'Ticket not found' }); // Send a response with status code 404 (Not Found) and a message indicating the ticket was not found
        }
        ticket.status = status; // Update the ticket's status
        await ticket.save(); // Save the updated ticket

        // Send notification to the assignee
        if (ticket.assignedTo) { // Check if the ticket has been assigned to a user
            const user = await User.findById(ticket.assignedTo); // Find the user to whom the ticket is assigned
            sendNotification(user.email, 'Ticket Status Updated', `The status of your ticket has been updated to ${status}.`); // Send notification to the assignee
        }

        res.json(ticket); // Send a response with the updated ticket
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a response with status code 500 (Internal Server Error) and the error message
    }
};
