// Not sure if needed atm
export interface ReservationData {
    id?: string;
    userId: string;
    timeSlotId: string;
    partySize: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    specialRequests?: string;
}