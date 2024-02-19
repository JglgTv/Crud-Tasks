import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

