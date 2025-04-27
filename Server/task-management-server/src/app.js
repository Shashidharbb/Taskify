const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const userHandle = require('./routes/userHandle');
const errorHandler = require('./middlewares/errorHandler');
const  connectDB  = require('./utils/db');
const env = require('./config/env');
const authMiddleware = require('./middlewares/authMiddleware');

const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./Swagger/swagger_output.json');
const { log } = require('console');
const app = express();


// Load environment variables
//env();

// Connect to the database
connectDB();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

// API routes
app.use('/api/taskcontrol', authMiddleware, taskRoutes);
app.use('/api/user', authMiddleware, userRoutes );
app.use('/user', userHandle);
// Error handling middleware
app.use(errorHandler);



app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app;