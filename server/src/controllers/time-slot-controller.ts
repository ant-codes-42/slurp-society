import { Request, Response } from 'express';
import { TimeSlot } from '../models/TimeSlot.js';

function getToday() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    if (dd < 10 && mm < 10) {
        return `${today.getFullYear()}-0${mm}-0${dd}`;
    } else if (dd < 10) {
        return `${today.getFullYear()}-${mm}-0${dd}`;
    } else if (mm < 10) {
        return `${today.getFullYear()}-0${mm}-${dd}`;
    } else {
        return `${today.getFullYear()}-${mm}-${dd}`;
    }
}

export const getAllTimeSlots = async (_req: Request, res: Response) => {
    try {
        const timeSlots = await TimeSlot.findAll();
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createTimeSlot = async (req: Request, res: Response) => {
    try {
        const { date, startTime, endTime, maxCapacity } = req.body;

        if (!date || !startTime || !endTime || !maxCapacity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Required so types match in model queries
        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({
                error: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        // Validate time format (HH:mm:ss or HH:mm)
        const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return res.status(400).json({
                error: 'Invalid time format. Use HH:mm:ss or HH:mm'
            });
        }

        const timeSlot = await TimeSlot.create({
            date,
            startTime,
            endTime,
            maxCapacity: Number(maxCapacity)
        });

        return res.status(201).json(timeSlot);
    } catch (error) {
        console.error('Error with createTimeSlot:', error);
        return res.status(500).json({ error: (error as Error).message });
    }
}

// Work in progress
export const createBulkTimeSlots = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, openTime, closeTime } = req.body;
        const todayDate = getToday();
        //const timeSlots = [];

        if (!startDate || !endDate || !openTime || !closeTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (todayDate > startDate) {
            return res.status(400).json({ error: 'Start date must be in the future' });
        }

        return res.status(200).json({ message: 'Time slots created' });
    } catch (error) {
        console.error('Error with createBulkTimeSlots:', error);
        return res.status(500).json({ error: (error as Error).message });
    }
}