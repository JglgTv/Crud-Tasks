import { Request, Response } from 'express';
import { Task } from '../models/Task';

let tasks: Task[] = [];

// Create Task
export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Read All Tasks
export const getAllTasks = (req: Request, res: Response) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Read Task by ID
export const getTaskById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Update Task
export const updateTask = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
      res.status(200).json(tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

// Delete Task
export const deleteTask = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};

