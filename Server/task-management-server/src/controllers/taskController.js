const {createTask , getAllTasks, getTaskById,updateTask, deleteTask} = require('../services/taskService');

class TaskController {
    constructor() {
        
    }

    async createTask(req, res) {
        try {
            const task = await createTask(req.body);
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await getAllTasks();
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await getTaskById(req.params.id);
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateTask(req, res) {
        try {
            const updatedTask = await updateTask(req.params.id, req.body);
            if (!updatedTask) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, data: updatedTask });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const deletedTask = await deleteTask(req.params.id);
            if (!deletedTask) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(204).json({ success: true, message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports=  TaskController;