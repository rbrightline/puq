import { EnvKeys } from '@puq/env';
import { TableNamingStrategy } from '../factory/naming-strategy.js';
import type { ConfigService } from '@nestjs/config';
import type { DataSourceModuleOptions } from './data-source-options.js';
import type { DataSourceOptions } from 'typeorm';

export function getSqliteDataSourceOptions(
  config: ConfigService,
  options: DataSourceModuleOptions,
): DataSourceOptions {
  const { synchronize, entities, dropSchema } = options;
  const database = config.getOrThrow(EnvKeys.DATABASE_NAME);
  return {
    type: 'better-sqlite3',
    database,
    entities,
    synchronize,
    dropSchema,
    namingStrategy: new TableNamingStrategy(),
  };
}
