# Support Ticket System

## Project Overview
This project is a microservice for managing customer support tickets. It allows users to create, update, and track support tickets, with role-based access control for customers, support agents, and admins. The system also includes a notification feature for ticket assignments and status changes.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/support-ticket-system.git
    cd support-ticket-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up Environment Variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    NEXT_PUBLIC_API_URL=your_api_url
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    EMAIL=your_email@gmail.com
    EMAIL_PASSWORD=your_email_password
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Auth
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user

### Tickets
- **POST /api/tickets** - Create a new ticket (Customer)
- **GET /api/tickets** - Get all tickets (Admin/Agent)
- **GET /api/tickets/:id** - Get ticket by ID (Authenticated Users)
- **PUT /api/tickets/:id** - Update a ticket (Admin/Agent)
- **DELETE /api/tickets/:id** - Delete a ticket (Admin)

### Users
- **GET /api/users/profile** - Get user profile (Authenticated Users)
- **PUT /api/users/role** - Update user role (Admin)
- **GET /api/users** - Get all users (Admin)

## Usage
Use Postman or any other API client to test the endpoints. Ensure to include the Authorization header with the JWT token for protected routes.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## Test the Endpoints

Use an API client like Postman to test the various endpoints:

### Register a new user:
- **POST /api/auth/register**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "customer"
    }
    ```

### Login a user:
- **POST /api/auth/login**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### Create a new ticket (after login to get JWT token):
- **POST /api/tickets**
    ```json
    {
      "title": "Issue with product",
      "description": "Details about the issue",
      "priority": "high"
    }
    ```
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Get all tickets (Admin/Agent):
- **GET /api/tickets**
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Get ticket by ID:
- **GET /api/tickets/:id**
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Update a ticket (Admin/Agent):
- **PUT /api/tickets/:id**
    ```json
    {
      "status": "in progress"
    }
    ```
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Delete a ticket (Admin):
- **DELETE /api/tickets/:id**
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Get user profile:
- **GET /api/users/profile**
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Update user role (Admin):
- **PUT /api/users/role**
    ```json
    {
      "email": "agent@example.com",
      "role": "agent"
    }
    ```
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

### Get all users (Admin):
- **GET /api/users**
    Headers:
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```
