const express = require('express');
const { getUserProfile, updateUserRole, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Authenticated Users
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         role:
 *           type: string
 *           description: The user's role
 *       example:
 *         id: '1'
 *         name: 'John Doe'
 *         email: 'john.doe@example.com'
 *         role: 'user'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authMiddleware, getUserProfile);

/**
 * @route PUT /api/users/role
 * @desc Update user role
 * @access Admin
 */

/**
 * @swagger
 * /api/users/role:
 *   put:
 *     summary: Update user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               userId: '1'
 *               role: 'admin'
 *     responses:
 *       200:
 *         description: User role updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/role', authMiddleware, roleMiddleware(['admin']), updateUserRole);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/role', authMiddleware, roleMiddleware(['admin']), updateUserRole);

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Admin
 */
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);

module.exports = router;
