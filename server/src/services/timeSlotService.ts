import { Op, Sequelize } from 'sequelize';
import { TimeSlot } from '../models/index.js';
import { addHours, format, parse } from 'date-fns';

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
        const openTime = parse(this.businessHours.openTime, 'HH:mm', date);
        const closeTime = parse(this.businessHours.closeTime, 'HH:mm', date);
        const slotDurationMs = this.businessHours.slotDuration * 60 * 1000; // need to set the slot duration to milliseconds for addition later

        const slots = [];
        let currentTime = openTime;

        // not sure if this needs to be currentTime + slotDurationMs < ...
        while (currentTime < closeTime) {
            const endTime = new Date(currentTime.getTime() + slotDurationMs);

            slots.push({
                date: format(date, 'yyyy-MM-dd'),
                startTime: format(currentTime, 'HH:mm:ss'),
                endTime: format(endTime, 'HH:mm:ss'),
                maxCapacity,
                currentBookings: 0,
                isAvailable: true,
            });

            currentTime = endTime;
        }

        // Bulk create with on duplicate in case we have existing slots
        await TimeSlot.bulkCreate(slots, {
            updateOnDuplicate: ['maxCapacity', 'isAvailable']
        });
    }

    async generateTimeSlotsForRange(startDate: Date, endDate: Date, maxCapacity: number): Promise<void> {
        let currentDate = startDate;
        while (currentDate <= endDate) {
            await this.generateTimeSlotsForDate(currentDate, maxCapacity);
            currentDate = addHours(currentDate, 1);
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
}