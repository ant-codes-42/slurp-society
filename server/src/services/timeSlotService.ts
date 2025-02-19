import { Op, Sequelize } from 'sequelize';
import { TimeSlot } from '../models/TimeSlot.js';
import { addDays, format } from 'date-fns';

interface BusinessHours {
    openTime: string;
    closeTime: string;
    slotDuration: number;
}

export class TimeSlotService {
    private businessHours: BusinessHours;

    constructor(businessHours: BusinessHours) {
        this.businessHours = businessHours;
    }

    // Generate time slots for a given date
    async generateTimeSlotsForDate(date: Date, maxCapacity: number): Promise<void> {
        const dateStr = format(date, 'yyyy-MM-dd');

        // Set specific timezone offset for consistent handling
        const baseDate = new Date(dateStr + 'T00:00:00.000Z');

        // Parse times with explicit timezone handling
        const [openHour, openMinute] = this.businessHours.openTime.split(':').map(Number);
        const [closeHour, closeMinute] = this.businessHours.closeTime.split(':').map(Number);

        const openTime = new Date(baseDate);
        openTime.setUTCHours(openHour, openMinute, 0);

        const closeTime = new Date(baseDate);
        closeTime.setUTCHours(closeHour, closeMinute, 0);

        const slotDurationMs = this.businessHours.slotDuration * 60 * 1000;

        const slots = [];
        let currentTime = openTime;

        while (currentTime < closeTime) {
            const endTime = new Date(currentTime.getTime() + slotDurationMs);

            console.log('Creating slot:', {
                date: format(currentTime, 'yyyy-MM-dd'),
                start: format(currentTime, 'HH:mm'),
                end: format(endTime, 'HH:mm')
            });

            slots.push({
                date: baseDate,
                startTime: currentTime,
                endTime: endTime,
                maxCapacity,
                currentBookings: 0,
                isAvailable: true,
            });

            currentTime = new Date(currentTime.getTime() + slotDurationMs);
        }

        await TimeSlot.bulkCreate(slots, {
            updateOnDuplicate: ['maxCapacity', 'isAvailable']
        });
    }

    async generateTimeSlotsForRange(startDate: Date, endDate: Date, maxCapacity: number): Promise<void> {
        let currentDate = startDate;
        while (currentDate <= endDate) {
            await this.generateTimeSlotsForDate(currentDate, maxCapacity);
            currentDate = addDays(currentDate, 1);
        }
    }

    async getAvailableTimeSlots(date: Date, minRequiredCapacity: number): Promise<TimeSlot[]> {
        return TimeSlot.findAll({
            where: {
                date: format(date, 'yyyy-MM-dd'),
                isAvailable: true,
                maxCapacity: {
                    [Op.gte]: Sequelize.literal(`current_bookings + ${minRequiredCapacity}`)
                }
            },
            order: [['startTime', 'ASC']]
        });
    }

    async getTimeSlotAvailability(timeSlotId: string): Promise<{
        available: boolean;
        remainingCapacity: number;
        timeSlot: TimeSlot | null;
    }> {
        const timeSlot = await TimeSlot.findByPk(timeSlotId);

        if (!timeSlot) {
            return {
                available: false,
                remainingCapacity: 0,
                timeSlot: null
            };
        }

        return {
            available: timeSlot.isAvailable,
            remainingCapacity: timeSlot.maxCapacity - timeSlot.currentBookings,
            timeSlot
        };
    }
}