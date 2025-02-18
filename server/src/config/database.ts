import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize with PostgreSQL
export const sequelize = new Sequelize(
    process.env.DB_NAME as string,     // Database Name
    process.env.DB_USER as string,     // Database User
    process.env.DB_PASSWORD as string, // Database Password
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false, // Set to true for debugging
    }
);

// Test the Connection
sequelize.authenticate()
    .then(() => console.log(' PostgreSQL connected successfully'))
    .catch((err) => console.error(' PostgreSQL connection error:', err));
