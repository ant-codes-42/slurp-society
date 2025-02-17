import { Router } from 'express';
import { TimeSlotService } from '../../services/timeSlotService.js';

export function createTimeSlotRouter(timeSlotService: TimeSlotService) {
    const router = Router();

    router.get('/available', async (req, res) => {
        try {
            const { date, partySize } = req.query;

            if (!date) {
                return res.status(400).json({
                    error: 'Date is required'
                });
            }

            const slots = await timeSlotService.getAvailableTimeSlots(
                new Date(date as string),
                Number(partySize) || 1
            );

            return res.status(200).json(slots);
        } catch (error) {
            console.error('Error fetching available time slots (api/timeslot/available/):', error);
            return res.status(500).json({
                error: 'Failed to fetch available time slots'
            });
        }
    });

    // POST /api timeslot/generate
    // Generate time slots for a given date range
    router.post('/generate', async (req, res) => {
        try {
            const { startDate, endDate, maxCapacity } = req.body;

            if (!startDate || !endDate || !maxCapacity) {
                return res.status(400).json({
                    error: 'Start date, end date, and max capacity are required'
                });
            }

            await timeSlotService.generateTimeSlotsForRange(
                new Date(startDate),
                new Date(endDate),
                Number(maxCapacity)
            );

            return res.status(201).json({
                message: 'Time slots generated successfully'
            });
        } catch (error) {
            console.error('Error generating time slots (api/timeslot/generate/):', error);
            return res.status(500).json({
                error: 'Failed to generate time slots'
            });
        }
    });
    
    return router;
}