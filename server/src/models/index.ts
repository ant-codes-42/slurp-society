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

const User = UserFactory(sequelize);
const TimeSlot = TimeSlotFactory(sequelize);
const Reservation = ReservationFactory(sequelize);

// Associations

User.hasMany(Reservation, {
    foreignKey: 'userId',
    //as: 'reservations'
});

Reservation.belongsTo(User, {
    foreignKey: 'userId',
    //as: 'users_table'
});

TimeSlot.hasMany(Reservation, {
    foreignKey: 'timeslotId',
    //as: 'reservations'
});

Reservation.belongsTo(TimeSlot, {
    foreignKey: 'timeslotId',
    //as: 'timeslot'
});

export { sequelize, Reservation, TimeSlot, User }; //removed Seating