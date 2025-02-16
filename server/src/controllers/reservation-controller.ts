import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';

export const getAllReservations = async (_req: Request, res: Response) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}