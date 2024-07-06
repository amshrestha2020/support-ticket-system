const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const app = express();


// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Support Ticket System API',
//             version: '1.0.0',
//             description: 'API documentation for the Support Ticket System',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:5000',
//             },
//         ],
//     },
//     apis: ['./routes/*.js'], // Paths to files with documentation
// };


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User and Ticket Management API',
        version: '1.0.0',
        description: 'API documentation for user and ticket operations',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/userRoutes.js', './routes/ticketRoutes.js', './routes/authRoutes.js', './utils/notification.js'],
    // Add paths to the API docs including authRoutes.js and notification.js

  };


const specs = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    specs,
};
