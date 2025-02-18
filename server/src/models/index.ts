import { ReservationFactory } from './Reservation.js';
import { TimeSlotFactory } from './TimeSlot.js';
import { UserFactory } from './User.js';
import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

// Init models

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(
        process.env.DB_NAME || '',
        process.env.DB_USER || '',
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'postgres',
            dialectOptions: {
                decimalNumbers: true,
            },
        }
    );

const Reservation = ReservationFactory(sequelize);
const TimeSlot = TimeSlotFactory(sequelize);
const User = UserFactory(sequelize);

// Associations

User.hasMany(Reservation, {
    foreignKey: 'userId',
    as: 'reservations'
});

Reservation.belongsTo(User, {
    foreignKey: 'userId',
    as: 'users'
});

TimeSlot.hasMany(Reservation, {
    foreignKey: 'timeslotId',
    as: 'reservations'
});

Reservation.belongsTo(TimeSlot, {
    foreignKey: 'timeslotId',
    as: 'timeslot'
});

export { sequelize, Reservation, TimeSlot, User }; //removed Seating