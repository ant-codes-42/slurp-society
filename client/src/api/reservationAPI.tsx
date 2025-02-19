const fetchReservation = async (id: string) => {
    try {
        const response = await fetch(`/api/reservations/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Reservation information not retrieved, check network tab!');
        }

        return data;

    } catch (err) {
        console.log('Error from reservation fetch: ', err);
        return Promise.reject('Could not fetch reservation info');
    }
}

const createReservation = async (userId: string, timeSlotId: string, partySize: string, specialRequests: string) => {
    try {
        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, timeSlotId, partySize, specialRequests })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Reservation not created, check network tab!');
        }

        return data;

    } catch (err) {
        console.log('Error from reservation creation: ', err);
        return Promise.reject('Could not create reservation');
    }
}
export { fetchReservation, createReservation };