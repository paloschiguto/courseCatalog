import { DataSource } from 'typeorm';
import { Cursos } from './entity/Curso';
import * as dotenv from 'dotenv';

dotenv.config();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,  
  logging: false,
  entities: [Cursos],
  migrations: [__dirname + '/migration/**/*.ts'],
  subscribers: [],
});
