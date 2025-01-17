import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  schema: process.env.POSTGRES_SCHEME_NAME || 'public',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
  seeds: ['src/database/seeds/*{.js,.ts}'],
  factories: ['src/database/factories/*{.js,.ts}'],
};

export const AppDataSource = new DataSource(options);
