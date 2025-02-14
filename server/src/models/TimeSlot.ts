import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
} from 'sequelize';

export class TimeSlot extends Model<
InferAttributes<TimeSlot>,
InferCreationAttributes<TimeSlot>
> {
    declare id: CreationOptional<string>;
    declare date: Date;
    declare startTime: Date;
    declare endTime: Date;
    declare isAvailable: CreationOptional<boolean>;
    declare maxCapacity: number;
    declare currentBookings: CreationOptional<number>;
}

export function TimeSlotFactory(sequelize: Sequelize) {
    TimeSlot.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            date: {
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
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            maxCapacity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            currentBookings: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'timeslot'
        }
    );

    return TimeSlot;
}