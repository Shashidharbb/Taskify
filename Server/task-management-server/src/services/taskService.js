const Task = require('../models/taskModel');

const createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
};

const getAllTasks = async () => {
    return await Task.find();
};

const getTaskById = async (taskId) => {
    return await Task.findById(taskId);
};

const updateTask = async (taskId, taskData) => {
    return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};