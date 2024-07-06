require('dotenv').config(); // Load dotenv at the top

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, specs } = require('./utils/swagger');
const { sendNotification, io } = require('./utils/notification'); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Example usage of process.env.JWT_SECRET
console.log('JWT Secret Key:', process.env.JWT_SECRET);

// Route middlewares
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Swagger setup
//app.use('/', swaggerSetup);


// WebSocket server setup
const server = http.createServer(app);
const socketServer = new Server(server);

// Handle incoming WebSocket connections
socketServer.on('connection', (socket) => {
    console.log('WebSocket client connected');

    socket.on('disconnect', () => {
        console.log('WebSocket client disconnected');
    });
});

// Example route to trigger notifications
app.post('/api/sendNotification', async (req, res) => {
    const { recipientEmail, subject, message } = req.body;

    try {
        // Send notification via email and WebSocket
        sendNotification(recipientEmail, subject, message);
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Failed to send notification' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
