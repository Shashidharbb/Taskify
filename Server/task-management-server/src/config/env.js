
const path = require('path');
const rootdir = path.resolve(__dirname, '..');

const dotenv = require('dotenv').config({path: rootdir + '/.env'});
const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};


module.exports = env;