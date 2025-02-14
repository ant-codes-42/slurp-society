import sequelize from '../config/connections.js';
import { ReservationFactory } from './Reservation.js';
import { TimeSlotFactory } from './TimeSlot';
import { SeatingFactory } from './Seating';
import { UserFactory } from './User.js';

// Init models

const Reservation = ReservationFactory(sequelize);
const TimeSlot = TimeSlotFactory(sequelize);
const Seating = SeatingFactory(sequelize);
const User = UserFactory(sequelize);

// Associations

User.hasMany(Reservation, {
    foreignKey: 'userId',
    as: 'reservations'
});

Reservation.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Seating.hasMany(Reservation, {
    foreignKey: 'seatingId',
    as: 'reservations'
});

Reservation.belongsTo(Seating, {
    foreignKey: 'seatingId',
    as: 'seating'
});

TimeSlot.hasMany(Reservation, {
    foreignKey: 'timeSlotId',
    as: 'reservations'
});

Reservation.belongsTo(TimeSlot, {
    foreignKey: 'timeSlotId',
    as: 'timeslot'
});

export { Reservation, TimeSlot, Seating, User };