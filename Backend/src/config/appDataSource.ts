import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Nurik123',
  database: process.env.DB_NAME || 'exam',
  schema: process.env.DB_SHEMA || 'webxl',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
};

export const AppDataSource = new DataSource(options);
