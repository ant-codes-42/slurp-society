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
    declare timeslotId: string;
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
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                field: 'user_id'
            },
            timeslotId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'timeslots',
                    key: 'id'
                },
                field: 'timeslot_id'
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