import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
} from 'sequelize';

export class Reservation extends Model<
InferAttributes<Reservation>,
InferCreationAttributes<Reservation>
> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare seatingId: string;
    declare timeslotId: string;
    declare reservationDate: Date;
    declare startTime: Date;
    declare endTime: Date;
    declare partySize: number;
    declare status: CreationOptional<'pending' | 'confirmed' | 'cancelled' | 'completed'>;
    declare specialRequests: CreationOptional<string>;
}

export function ReservationFactory(sequelize: Sequelize) {
    Reservation.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            seatingId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            timeslotId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            reservationDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            startTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            endTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            partySize: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1
                }
            },
            status: {
                type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
                defaultValue: 'pending'
            },
            specialRequests: {
                type: DataTypes.TEXT
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'reservations'
        }
    );

    return Reservation;
}