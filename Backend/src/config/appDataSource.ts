import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Nurik123',
  database: 'exam',
  schema: 'webxl',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
  seeds: ['src/database/seeds/*{.js,.ts}'],
  factories: ['src/database/factories/*{.js,.ts}'],
};

export const AppDataSource = new DataSource(options);
