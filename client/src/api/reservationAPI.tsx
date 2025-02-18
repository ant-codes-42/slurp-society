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

export { fetchReservation };