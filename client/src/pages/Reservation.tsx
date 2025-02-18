import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { formatDate } from '../utils/dateUtils.js';
import { getAvailableTimeslots } from '../api/timeslotAPI';
import { Value } from 'react-calendar/dist/cjs/shared/types.js';

const Reservation = () => {
    //REFACTOR: Convert back to using <Date | null> object
    const [calendarDate, setCalendarDate] = useState<Value>(null);
    const [partySize, setPartySize] = useState<number>(1);

    function handleDateChange(nextDate: Value) {
        setCalendarDate(nextDate);
    }

    useEffect(() => {
        console.log('Calendar date:', calendarDate);
        console.log('Party size:', partySize);

        if (calendarDate && calendarDate instanceof Date) {
            const formattedDate = formatDate(calendarDate.toISOString());
            console.log('Formatted date:', formattedDate);
            getAvailableTimeslots(formattedDate, partySize)
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