import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
} from 'sequelize';

export class User extends Model<
InferAttributes<User>,
InferCreationAttributes<User>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare name: string;
    declare phone: string;
}

export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'user'
        }
    );

    return User;
}