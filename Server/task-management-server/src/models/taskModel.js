const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'low',
    },
    createdByEmail: {
        type: String, // Email of the user who created the task
        required: true,
    },
    updatedByEmail: {
        type: String, // Email of the user who last updated the task
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default:() => new Date().toISOString(),
    },
    updatedAt: {
        type: Date,
        default:() => new Date().toISOString(),
    },
});

taskSchema.pre('save', function(next) {
    this.updatedAt =new Date().toISOString();
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;