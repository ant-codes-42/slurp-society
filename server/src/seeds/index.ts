import sequelize from '../config/connections.js';
import { ReservationFactory } from '../models/Reservation.js';
import { TimeSlotFactory } from '../models/TimeSlot.js';
import { SeatingFactory } from '../models/Seating.js';
import { UserFactory } from '../models/User.js';

// Init models
const seedAll = async (): Promise<void> => {
    try {
        ReservationFactory(sequelize);
        TimeSlotFactory(sequelize);
        SeatingFactory(sequelize);
        UserFactory(sequelize);
        await sequelize.sync({ force: true });
        console.log('Database synced successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
};

seedAll(); // seeds database with models