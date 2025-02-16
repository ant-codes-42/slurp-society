import { Request, Response } from 'express';
import { TimeSlot } from '../models/TimeSlot.js';

export const getAllTimeSlots = async (_req: Request, res: Response) => {
    try {
        const timeSlots = await TimeSlot.findAll();
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}