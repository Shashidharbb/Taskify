const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Import the User model
const Helpers = require('../helpers/helperMethods.js'); // Import the user helpers
const router = express.Router();

const helpers = new Helpers();
// Add a new user
router.post('/add', async (req, res) => {
    try {
        const { name, username, email, password, isAdmin, isSuperAdmin, country, allowToDelete, active } = req.body;

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
            name,
            username,
            email,
            password: hashedPassword,
            isAdmin,
            isSuperAdmin,
            country,
            allowToDelete,
            active,
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});

// Edit (update) an existing user
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email, isAdmin, isSuperAdmin, country, allowToDelete, active } = req.body;

        // Find the user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, username, email, isAdmin, isSuperAdmin, country, allowToDelete, active },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Get all users
router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});
 
module.exports = router;