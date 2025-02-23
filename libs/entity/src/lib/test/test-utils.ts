import { DataSource } from 'typeorm';
import { Type } from '@puq/type';

export async function sqliteTestDataSource(entities: Type[]) {
  return new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities,
    synchronize: true,
    dropSchema: true,
  }).initialize();
}

export async function pgTestDataSource(entities: Type[]) {
  return new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities,
    synchronize: true,
    dropSchema: true,
  }).initialize();
}
