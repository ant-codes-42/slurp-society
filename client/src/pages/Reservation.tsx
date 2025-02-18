import { useState } from 'react';
import Calendar from 'react-calendar';

type CalendarDatePiece = Date | null;
type CalendarDate = CalendarDatePiece | [CalendarDatePiece, CalendarDatePiece];

const Reservation = () => {
    const [calendarDate, setCalendarDate] = useState<CalendarDate>(new Date());

    function handleDateChange(nextDate: CalendarDate) {
        setCalendarDate(nextDate);
    }

    return (
        <div>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={calendarDate}
                />
            </div>
            
        </div>
    );
}

export default Reservation;