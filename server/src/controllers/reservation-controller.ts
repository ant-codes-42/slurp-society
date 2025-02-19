import { Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { sequelize } from '../models/index.js';
import { Reservation } from '../models/Reservation.js';
import { TimeSlot } from '../models/TimeSlot.js';
import { User } from '../models/User.js';

export const getAllReservations = async (_req: Request, res: Response) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Check availability for a reservation, specific date, time, and party size
export const checkResAvailability = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { date, time, partySize } = req.query; // query parameters in format ?date=...&time=...&partySize=...

        // data validation, return 400 Bad Request if any of the required parameters are missing
        if (!date || !time || !partySize ||
            typeof date !== 'string' ||
            typeof time !== 'string' ||
            typeof partySize !== 'string') {
            return res.status(400).json({
                error: 'Date, time, and party size are required'
            });
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
        if (!timeRegex.test(time)) {
            return res.status(400).json({
                error: 'Invalid time format. Use HH:mm:ss or HH:mm'
            });
        }

        const timeSlot = await TimeSlot.findOne({
            where: {
                date: date,
                startTime: time,
                isAvailable: true,
            }
        });

        if (!timeSlot) {
            return res.status(200).json({
                available: false,
                reason: 'Time slot not found or not available'
            });
        }

        const available = (timeSlot.currentBookings + Number(partySize)) <= timeSlot.maxCapacity;

        return res.status(200).json({
            available,
            remainingCapacity: timeSlot.maxCapacity - timeSlot.currentBookings,
            timeSlot
        });
    } catch (error) {
        console.error('Error with checkResAvailability:', error);
        return res.status(500).json({
            error: 'Failed to check availability'
        });
    }
}

// POST /api/reservations
// Create a new reservation
export const createReservation = async (req: Request, res: Response): Promise<Response> => {
    const transaction: Transaction = await sequelize.transaction();

    try {
        const {
            userId,
            timeSlotId,
            partySize,
            specialRequests
        } = req.body;

        console.log('Attempting to create reservation:', {
            userId, timeSlotId, partySize, specialRequests
        });

        const user = await User.findByPk(userId, { transaction });
        console.log('Found user:', user ? 'Yes' : 'No');

        // Validate the required fields only
        if (!userId || !timeSlotId || !partySize ||
            typeof userId !== 'string' ||
            typeof timeSlotId !== 'string' ||
            typeof partySize !== 'string'
        ) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        // Check availabilty
        const timeSlot = await TimeSlot.findByPk(timeSlotId, {
            transaction,
            lock: true // Lock to avoid simultaneous updates edge case
        });

        if (!timeSlot || !timeSlot.isAvailable) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Selected time slot is not available'
            });
        }

        if ((timeSlot.currentBookings + Number(partySize)) > timeSlot.maxCapacity) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Selected time slot is at full capacity'
            });
        }

        console.log('Creating reservation with data:', {
            userId,
            timeslotId: timeSlotId,
            partySize: Number(partySize),
            status: 'confirmed',
            specialRequests
        });

        //Create reservation
        const reservation = await Reservation.create({
            userId,
            timeslotId: timeSlotId,
            partySize: Number(partySize),
            status: 'confirmed',
            specialRequests
        }, { transaction });

        // Update time slot capacity
        await timeSlot.increment('currentBookings', {
            by: Number(partySize),
            transaction
        });

        await transaction.commit();

        return res.status(201).json(reservation);
    } catch (error) {
        await transaction.rollback();
        console.error('Detailed error:', error);
        console.error('SQL Query:', (error as any).sql);
        console.error('Parameters:', (error as any).parameters);
        return res.status(500).json({
            error: 'Failed to create reservation'
        });
    }
}