// GET request to /api/timeslots/available?
// date=YYYY-MM-DD&partySize=number
const getAvailableTimeslots = async(date: string | null, partySize: number | null) => {
    try {
        if (!date || !partySize) {
            throw new Error('Date and party size are required');
        }

        if (partySize < 1) {
            throw new Error('Party size must be at least 1');
        }

        if (date < new Date().toISOString().split('T')[0]) {
            throw new Error('Date must be in the future');
        }

        const response = await fetch(`/api/timeslots/available?date=${date}&partySize=${partySize}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Timeslot information not retrieved, check network tab!');
        }

        return data;

    } catch (err) {
        console.log('Error from timeslot fetch: ', err);
        return Promise.reject('Could not fetch timeslot info');
    }
}

export { getAvailableTimeslots };