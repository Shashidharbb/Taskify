const mongoose = require('mongoose');
const path = require('path');
const rootdir = path.resolve(__dirname, '..');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config({path: rootdir + '/.env'});

const User = require('../models/userModel'); // Import the existing User model
const Helpers = require('../helpers/helperMethods'); // Import the user helpers

const helpers = new Helpers(); 

const connectDB = async () => {
    try {
    
      let mg =  await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

          // Check if the admin user exists
          const adminEmail = 'admin@example.com'; // Default admin email
          const adminPassword = process.env.ADMIN_PASSWORD ; // Default admin password from .env
          const existingAdmin = await User.findOne({ email: adminEmail });
          if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            // Create the admin user
            const adminUser = new User({
                ID:  helpers.generateUniqueId(), // Use the helper function to generate a unique ID 
                name: 'Admin',
                username: 'admin', // Add a default username
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
                isSuperAdmin: true, // Mark as super admin if needed
                country: 'Default Country', // Add a default country
                allowToDelete: false, // Allow admin to delete
                active: true,
            });

            await adminUser.save();
            console.log('Admin user created with default credentials');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;