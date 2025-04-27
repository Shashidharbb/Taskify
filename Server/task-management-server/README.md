# Task Management Backend

This is a simple task management backend built with Node.js and Express. It allows users to create, read, update, and delete tasks. The application uses MongoDB for data storage and implements JWT for user authentication.

## Features

- Create, read, update, and delete tasks
- User authentication using JWT
- Error handling middleware
- Environment variable configuration

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- JWT for authentication
- dotenv for environment variable management
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd task-management-backend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables. Example:

   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

### Running the Application

To start the server, run:

```
npm start
```


The server will start on the specified port (default is 3000).

# default user name and password created on server started
admin@example.com
admin@2Admin123

### API Endpoints

- **POST /tasks**: Create a new task
- **GET /tasks**: Retrieve all tasks
- **GET /tasks/:id**: Retrieve a task by ID
- **PUT /tasks/:id**: Update a task by ID
- **DELETE /tasks/:id**: Delete a task by ID

### Error Handling

The application includes middleware for error handling, which standardizes the response format for errors.

### License

This project is licensed under the MIT License.