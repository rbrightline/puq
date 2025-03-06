import type { Provider } from '@nestjs/common';
import type { DataSourceOptions } from 'typeorm';
import { getDataSourceToken } from './data-source-provider.js';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TableNamingStrategy } from '../factory/naming-strategy.js';
import { DataSourceEnv } from './data-source-env.js';

/**
 * Provide SQLite data-source options
 * @param name - data-source name which is useful when working with multiple databases
 * @returns - data-source options
 */
export function provideSQLiteDataSourceOptions(
  name: string,
): Provider<DataSourceOptions> {
  return {
    inject: [ConfigService],
    provide: getDataSourceToken(name),
    useFactory(config: ConfigService) {
      return {
        type: 'better-sqlite3',
        username: config.getOrThrow<string>(DataSourceEnv.DATABASE_USERNAME),
        password: config.getOrThrow<string>(DataSourceEnv.DATABASE_PASSWORD),
        database: config.getOrThrow<string>(DataSourceEnv.DATABASE_NAME),
        synchronize: config.get<string>('NODE_ENV') === 'development', // Disable in production
        dropSchema: config.get<string>('NODE_ENV') === 'development', // Disable in production
        namingStrategy: new TableNamingStrategy(),
        migrations: [join(__dirname, 'migrations', '*.ts}')], // Migration files
        migrationsRun: true, // Auto-run migrations on startup
      };
    },
  };
}
