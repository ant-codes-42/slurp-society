import { Request, Response } from 'express';
import { User } from '../models/User.js';

// GET /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}