import { Router } from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.Controllers';
import { authenticateToken } from '../utils/authMiddleware';

const router = Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getAllTasks);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

export default router;





