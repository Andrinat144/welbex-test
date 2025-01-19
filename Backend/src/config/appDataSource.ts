import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'nursultan',
  password: 'password1',
  database: 'postgres',
  schema: 'public',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
};

export const AppDataSource = new DataSource(options);
