import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'Nurik123',
  database: process.env.POSTGRES_DB || 'exam',
  schema: process.env.POSTGRES_SCHEMA || 'exam12',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
};

export const AppDataSource = new DataSource(options);
