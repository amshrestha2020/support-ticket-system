const express = require('express');
const {
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  assignTicket,
  updateStatus
} = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this path is correct
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @route POST /api/tickets
 * @desc Create a new ticket
 * @access Customer
 * @middleware authMiddleware, roleMiddleware(['customer'])
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ticket
 *         title:
 *           type: string
 *           description: The title of the ticket
 *         description:
 *           type: string
 *           description: The description of the ticket
 *         status:
 *           type: string
 *           description: The status of the ticket
 *           enum: [open, in progress, closed]
 *         priority:
 *           type: string
 *           description: The priority of the ticket
 *           enum: [low, medium, high]
 *         createdBy:
 *           type: string
 *           description: The user ID who created the ticket
 *         assignedTo:
 *           type: string
 *           description: The user ID to whom the ticket is assigned
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the ticket was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the ticket was last updated
 *       example:
 *         id: '1'
 *         title: 'Issue with login'
 *         description: 'Unable to login with correct credentials'
 *         status: 'open'
 *         priority: 'medium'
 *         createdBy: 'user123'
 *         assignedTo: 'agent456'
 *         createdAt: '2023-07-01T14:48:00.000Z'
 *         updatedAt: '2023-07-02T15:00:00.000Z'
 */



/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '201':
 *         description: The created ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 */


router.post('/', authMiddleware, roleMiddleware(['customer']), createTicket);


/**
 * @route GET /api/tickets
 * @desc Get all tickets
 * @access Admin/Agent
 * @middleware authMiddleware, roleMiddleware(['admin', 'agent'])
 */


/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */

router.get('/', authMiddleware, roleMiddleware(['admin', 'agent']), getAllTickets);


/**
 * @route GET /api/tickets/:id
 * @desc Get ticket by ID
 * @access Authenticated Users
 * @middleware authMiddleware
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       '200':
 *         description: The ticket details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Ticket not found
 */

router.get('/:id', authMiddleware, getTicketById);

/**
 * @route PUT /api/tickets/:id
 * @desc Update a ticket
 * @access Admin/Agent
 * @middleware authMiddleware, roleMiddleware(['admin', 'agent'])
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: The updated ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Ticket not found
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin', 'agent']), updateTicket);


/**
 * @route DELETE /api/tickets/:id
 * @desc Delete a ticket
 * @access Admin
 * @middleware authMiddleware, roleMiddleware(['admin'])
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       '200':
 *         description: The deleted ticket
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Ticket not found
 */

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteTicket);



/**
 * @route PUT /api/tickets/:id/assign
 * @desc Assign a ticket to a user
 * @access Admin
 * @middleware authMiddleware, roleMiddleware(['admin'])
 */


/**
 * @swagger
 * /api/tickets/{id}/assign:
 *   put:
 *     summary: Assign a ticket to a user
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignee:
 *                 type: string
 *             example:
 *               assignee: 'agent123'
 *     responses:
 *       '200':
 *         description: The assigned ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Ticket not found
 */


router.put('/:id/assign', authMiddleware, roleMiddleware(['admin']), assignTicket);



/**
 * @route PUT /api/tickets/:id/status
 * @desc Update the status of a ticket
 * @access Admin/Agent
 * @middleware authMiddleware, roleMiddleware(['admin', 'agent'])
 */


/**
 * @swagger
 * /api/tickets/{id}/status:
 *   put:
 *     summary: Update the status of a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, in progress, closed]
 *             example:
 *               status: 'closed'
 *     responses:
 *       '200':
 *         description: The updated ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Ticket not found
 */

router.put('/:id/status', authMiddleware, roleMiddleware(['admin', 'agent']), updateStatus);

module.exports = router;
