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
};

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
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;
    try {
        const user = await User.create({ name, email, phone, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        await user.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};