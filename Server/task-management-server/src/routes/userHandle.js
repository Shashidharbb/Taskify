const express = require('express');
const User = require('../models/userModel.js');
const router = express.Router();    
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env.js'); // Import your JWT secret from the environment variables
const HelpersClass = require('../helpers/helperMethods.js'); // Import the user helpers
const helpers = new HelpersClass();
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(existingUser);
            if(!existingUser.active) {
                return res.status(403).json({ message: 'User is not active' });
            }else{
                const isPasswordValid = await bcrypt.compare(password, existingUser.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid password' });
                }else{
                    const userData = {
                            "name": existingUser.name,
                            "username": existingUser.username,
                            "email": existingUser.email,
                            "isAdmin": existingUser.isAdmin,
                            "isSuperAdmin": existingUser.isSuperAdmin,
                            "country": existingUser.country,
                            "allowToDelete": existingUser.allowToDelete,
                            "active": existingUser.active,
                            "ID": existingUser.ID,
                            "_id": existingUser._id,

                    };
                    const token = jwt.sign(userData, env.JWT_SECRET, { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true, secure: true }); // Set the cookie with the token
                    let userObject = {
                        "Authorization": token,
                        "expiresIn": '1h',
                        user: userData
                       
                    }

                    return res.status(200).json({ message: 'User login successfully', user: userObject });
                }
            }
        }
        res.status(200).json({ message: 'User login successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error login user', error });
    }
}
);  

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, country,  } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            ID: helpers.generateUniqueId(), // Use the helper function to generate a unique ID
            name:name,
            username:email,
            email:  email,
            
            password: hashedPassword,
            isAdmin: false,
            isSuperAdmin: false,
            country:  country,
            allowToDelete: false,
            active: true, // Set the user as active by default but once user mangement is done, this will be set to false
            
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});

module.exports = router;