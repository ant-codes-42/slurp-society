import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
} from 'sequelize';

export class Seating extends Model<
InferAttributes<Seating>,
InferCreationAttributes<Seating>
> {
    declare id: CreationOptional<string>;
    declare tableNumber: number;
    declare capacity: number;
    declare isActive: CreationOptional<boolean>;
}

export function SeatingFactory(sequelize: Sequelize) {
    Seating.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            tableNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'seating'
        }
    );

    return Seating;
}