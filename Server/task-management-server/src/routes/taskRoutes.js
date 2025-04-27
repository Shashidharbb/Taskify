const express = require('express');
const TaskController = require('../controllers/taskController.js');

const router = express.Router();
const taskController = new TaskController();
const Task = require('../models/taskModel');
const { createTask, getAllTasks, getTaskById,updateTask, deleteTask} = require('../services/taskService');
// router.post('/tasks/create', taskController.createTask);
// router.get('/tasks/getall', taskController.getAllTasks);
// router.get('/tasks/:id', taskController.getTaskById);   
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);

/**Too support swagger documentation code moved here */
// Task routes


router.post('/tasks/create', async (req, res) => {
    try {
       const task = await createTask(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    });

router.get('/tasks/getall',async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    });

router.get('/tasks/:id',  async (req, res)=> {
        try {
            const task = await getTaskById(req.params.id);
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

router.put('/tasks/:id',  async (req, res) =>{
    try {
        const updatedTask = await updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 * delete:
 * summary: Delete a task by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the task to delete
 * schema:
 * type: string
 * responses:
 * 204:
 * description: Task deleted successfully
 * 404:
 * description: Task not found
 * 500:
 * description: Server error
 */
router.delete('/tasks/:id',   async (req, res)=> {
    try {
        const deletedTask = await deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(204).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports= router;