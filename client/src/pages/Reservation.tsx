import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { formatDate } from '../utils/dateUtils.js';
import { getAvailableTimeslots } from '../api/timeslotAPI';
import { Value } from 'react-calendar/dist/cjs/shared/types.js';
import { useNavigate } from 'react-router';

const Reservation = () => {
    const [calendarDate, setCalendarDate] = useState<Value>(null);
    const [partySize, setPartySize] = useState<number>(1);
    const [timeslots, setTimeslots] = useState<any[]>([]);
    const navigate = useNavigate();

    function handleDateChange(nextDate: Value) {
        setCalendarDate(nextDate);
    }

    // Track the calendarDate and partySize state values
    useEffect(() => {
        console.log('Calendar date:', calendarDate); //log for debugging
        console.log('Party size:', partySize); //log for debugging

        // Fetch available timeslots when calendarDate and partySize are set
        if (calendarDate && calendarDate instanceof Date) {
            //REFACTOR: Convert back to using <Value> object, move formatDate to getAvailableTimeslots
            const formattedDate = formatDate(calendarDate.toISOString());
            getAvailableTimeslots(formattedDate, partySize)
                .then((timeslots) => {
                    console.log('Available timeslots:', timeslots);
                    setTimeslots(timeslots);
                })
                .catch((error) => {
                    console.error('Error fetching available timeslots:', error);
                });
        }

    }, [calendarDate, partySize]);

    // Navigate to reservation creation page when a timeslot is selected, slotId is passed as a parameter
    function handleSlotSelection(slotId: string) {
        navigate(`/reservation/create/${slotId}?partySize=${partySize}`);
    }

    return (
        <div>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={calendarDate}
                />
            </div>
            <label>Party Size:</label>
            <input
                type="number"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
            />
            <div className='timeslots'>
                {timeslots ? (
                    <ul>
                        {timeslots.map((slot) => (
                            <li key={slot.id}>
                                <button onClick={() => handleSlotSelection(slot.id)}>
                                    {slot.startTime}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default Reservation;