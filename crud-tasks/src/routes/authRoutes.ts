import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = 'Joaquim12@';

// User simulation for demonstration purposes
let mockUser = {
  id: 1,
  username: 'user',
  password: '$2a$10$byOuYNYNCkv8g8k0HhH.R.P.nh94KsJ03Cw3lUpjD/uSvdlt8jAFe' // password: 'password'
};

// User Login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (username !== mockUser.username || !await bcrypt.compare(password, mockUser.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: mockUser.id, username: mockUser.username }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

// Create new user
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    const token = jwt.sign({ 
        id: mockUser.id, 
        username: mockUser.username,
        createdAt: new Date() // Adds creation date to the payload
      }, SECRET_KEY);
      
    // Check if user already exists
    if (mockUser.username === username) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: mockUser.id + 1,
      username,
      password: hashedPassword
    };

    // Replace mockUser with the new user
    mockUser = newUser;

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

export default router;
