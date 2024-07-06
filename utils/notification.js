const nodemailer = require('nodemailer'); // Import nodemailer library
const { Server } = require('socket.io');


// Create a transporter using SMTP for sending emails
const transporter = nodemailer.createTransport({
    service: 'hotmail', // Specify the email service provider
    auth: {
        user: process.env.EMAIL, // Email address from environment variables
        pass: process.env.EMAIL_PASSWORD // Email password from environment variables
    }
});

// Initialize socket.io server instance
const io = new Server();



/**
 * @desc Send email notification
 * This function sends an email notification using nodemailer.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email text
 */
exports.sendNotification = (recipientEmail, subject, message) => {
    // Email options including sender, recipient, subject, and message
    const mailOptions = {
        from: process.env.EMAIL, // Sender's email address
        to: recipientEmail, // Recipient's email address
        subject: subject, // Email subject
        text: message // Email text content
    };

    // Send the email using the transporter
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Email error:', err); // Log an error if sending fails
        } else {
            console.log('Email sent: ' + info.response); // Log success message with email response info

            // Emit WebSocket event for real-time notification
            io.emit('notification', {
                recipient: recipientEmail,
                subject: subject,
                message: message
            });
        }
    });
};

