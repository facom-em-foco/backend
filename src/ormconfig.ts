import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(`${process.env.DATABASE_PORT}`, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
};
