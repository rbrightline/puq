import { EnvKeys } from '@puq/env';
import type { DataSourceOptions } from 'typeorm';
import { TableNamingStrategy } from '../factory/naming-strategy.js';
import type { Type } from '@puq/type';
import { ConfigService } from '@nestjs/config';

export type DataSourceModuleOptions = {
  entities: Type[];
  synchronize?: boolean;
  dropSchema?: boolean;
};

export function getDataSourceOptions(
  config: ConfigService,
  options: DataSourceModuleOptions,
): DataSourceOptions {
  const { synchronize, entities, dropSchema } = options;
  const host = config.getOrThrow(EnvKeys.DATABASE_HOST, 'localhost');
  const port = config.getOrThrow(EnvKeys.DATABASE_PORT, 5432);
  const username = config.getOrThrow(EnvKeys.DATABASE_USERNAME);
  const password = config.getOrThrow(EnvKeys.DATABASE_PASSWORD);
  const database = config.getOrThrow(EnvKeys.DATABASE_NAME);
  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize,
    dropSchema,
    namingStrategy: new TableNamingStrategy(),
    poolSize: 50,
    extra: {
      max: 50, // Maximum number of connections in the pool
      min: 4, // Minimum number of connections to keep open
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
  };
}
