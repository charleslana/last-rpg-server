import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT as string),
  }
);
