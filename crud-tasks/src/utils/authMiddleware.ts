import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'Joaquim12@';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
    try {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      
      // Check if the token was created less than 15 minutes ago 
      const tokenCreationTime = new Date(decoded.createdAt);
      const currentTime = new Date();
      const tokenAge = Math.abs(currentTime.getTime() - tokenCreationTime.getTime());
      const maxTokenAge = 15 * 60 * 1000; // 15 minutes in milliseconds
      if (tokenAge > maxTokenAge) {
        return res.status(401).json({ message: 'Token expired. Please log in again.' });
      }
  
      req.body.user = decoded;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(400).json({ message: 'Invalid token.' });
    }
  };