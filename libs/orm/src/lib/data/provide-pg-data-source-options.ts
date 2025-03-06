import type { Provider } from '@nestjs/common';
import type { DataSourceOptions } from 'typeorm';
import { getDataSourceToken } from './data-source-provider.js';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TableNamingStrategy } from '../factory/naming-strategy.js';
import { DataSourceEnv } from './data-source-env.js';

/**
 * Provide postgres datasource options
 * @param name - datasource name which is useful when working with multiple databases
 * @returns - datasource options
 */
export function providePGDataSourceOptions(
  name: string,
): Provider<DataSourceOptions> {
  return {
    inject: [ConfigService],
    provide: getDataSourceToken(name),
    useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get<string>(DataSourceEnv.DATABASE_HOST),
        port: config.get<number>(DataSourceEnv.DATABASE_PORT),
        username: config.getOrThrow<string>(DataSourceEnv.DATABASE_USERNAME),
        password: config.getOrThrow<string>('DATABASE_PASSWORD'),
        database: config.getOrThrow<string>(DataSourceEnv.DATABASE_NAME),
        synchronize: config.get<string>('NODE_ENV') === 'development', // Disable in production
        dropSchema: config.get<string>('NODE_ENV') === 'development', // Disable in production
        namingStrategy: new TableNamingStrategy(),
        migrations: [join(__dirname, 'migrations', '*.ts}')], // Migration files
        migrationsRun: true, // Auto-run migrations on startup

        // Pool configuration
        poolSize: 50,
        extra: {
          max: 50, // Maximum number of connections in the pool
          min: 4, // Minimum number of connections to keep open
          idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
        },
      };
    },
  };
}
