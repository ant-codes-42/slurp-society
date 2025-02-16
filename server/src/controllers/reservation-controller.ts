import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import { sequelize } from '../models/index.js';
import { Reservation } from '../models/Reservation.js';
import { TimeSlot } from '../models/TimeSlot.js';
import { Seating } from '../models/Seating.js';

interface SeatingWithReservations extends Seating {
    reservations?: Reservation[];
}

export const getAllReservations = async (_req: Request, res: Response) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Check availability for a reservation, specific date, time, and party size
export const checkResAvailability = async (req: Request, res: Response) => {
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
            // NOTE: CHANGED ALL THE DATE TYPES TO STRING (DATEONLY, TIME) IN THE MODELS DECLARE, maybe change back
            where: { // can't get the fucking date types to work, string is coming in from the query
                date: date,
                startTime: time,
                isAvailable: true,
                maxCapacity: {
                    [Op.gte]: Sequelize.literal(`${Number(partySize)} + currentBookings`)
                }
            }
        });

        if (!timeSlot) {
            return res.status(200).json({ available: false });
        }

        const availableSeating = await Seating.findAll({
            where: {
                capacity: {
                    [Op.gte]: Number(partySize)
                },
                isActive: true
            },
            include: [{
                model: Reservation,
                where: {
                    reservationDate: date,
                    startTime: time,
                    status: {
                        [Op.notIn]: ['cancelled', 'completed']
                    }
                },
                required: false
            }]
        }) as SeatingWithReservations[];

        const hasAvailableSeating = availableSeating.some(seating => {
            // If there are no reservations array or it's empty, the seating is available
            if (!seating.reservations || seating.reservations.length === 0) {
                return true;
            }

            // Check if all existing reservations are either cancelled or completed
            return seating.reservations.every(reservation =>
                reservation.status === 'cancelled' ||
                reservation.status === 'completed'
            );
        });

        return res.status(200).json({
            available: hasAvailableSeating,
            timeSlot: timeSlot
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
export const createReservation = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            userId,
            reservationDate,
            startTime,
            endTime,
            partySize,
            specialRequests
        } = req.body;

        // Validate the required fields only
        if (!userId || !reservationDate || !startTime || !endTime || !partySize) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        // Check availabilty
        const timeSlot = await TimeSlot.findOne({
            where: {
                date: reservationDate,
                startTime,
                isAvailable: true,
                maxCapacity: {
                    [Op.gte]: Sequelize.literal(`${Number(partySize)} + currentBookings`)
                }
            },
            transaction
        });

        if (!timeSlot) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'Selected time slot is not available'
            });
        }

        const seating = await Seating.findOne({
            where: {
                capacity: {
                    [Op.gte]: Number(partySize)
                },
                isActive: true
            },
            include: [{
                model: Reservation,
                where: {
                    reservationDate,
                    startTime,
                    status: {
                        [Op.notIn]: ['cancelled', 'completed']
                    }
                },
                required: false
            }],
            transaction
        });

        if (!seating) {
            await transaction.rollback();
            return res.status(400).json({
                error: 'No seating available for the selected time slot'
            });
        }

        //Create reservation
        const reservation = await Reservation.create({
            userId,
            seatingId: seating.id,
            timeslotId: timeSlot.id,
            reservationDate,
            startTime,
            endTime,
            partySize,
            status: 'confirmed',
            specialRequests
        }, { transaction });

        // Update time slot capacity
        await timeSlot.increment('currentBookings', {
            by: partySize,
            transaction
        });

        await transaction.commit();

        return res.status(201).json(reservation);
    } catch (error) {
        await transaction.rollback();
        console.error('Error with createReservation:', error);
        return res.status(500).json({
            error: 'Failed to create reservation'
        });
    }
}