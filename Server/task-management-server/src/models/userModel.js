const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
        required: true,
    },
    allowToDelete: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    session: {
        type: String, // Can store session tokens or IDs
        default: null,
    },
    createdDate: {
        type: Date,
        default: () => new Date().toISOString(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date().toISOString(),
    },
});

// Middleware to update `updatedDate` before saving
userSchema.pre('save', function (next) {
    this.updatedDate = new Date().toISOString();
    next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;