import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getAvailableTimeslots } from '../api/timeslotAPI';

type CalendarDatePiece = Date | null;
type CalendarDate = CalendarDatePiece | [CalendarDatePiece, CalendarDatePiece];

const Reservation = () => {
    const [calendarDate, setCalendarDate] = useState<CalendarDate>(new Date());
    const [partySize, setPartySize] = useState<number>(1);

    function handleDateChange(nextDate: CalendarDate) {
        setCalendarDate(nextDate);
    }

    useEffect(() => {
        console.log('Calendar date:', calendarDate);
        console.log('Party size:', partySize);

        if (Array.isArray(calendarDate)) {
            const [startDate, endDate] = calendarDate;
            if (startDate && endDate) {
                getAvailableTimeslots(startDate.toISOString(), partySize)
                    .then((timeslots) => {
                        console.log('Available timeslots:', timeslots);
                    })
                    .catch((error) => {
                        console.error('Error fetching available timeslots:', error);
                    });
            }
        } else if (calendarDate) {
            getAvailableTimeslots(calendarDate.toISOString(), partySize)
                .then((timeslots) => {
                    console.log('Available timeslots:', timeslots);
                })
                .catch((error) => {
                    console.error('Error fetching available timeslots:', error);
                });
        }

    }, [calendarDate, partySize]);

    return (
        <div>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={calendarDate}
                />
            </div>
            <input 
                type="number"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
            />
        </div>
    );
}

export default Reservation;