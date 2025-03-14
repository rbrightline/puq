import type { DynamicModule, OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import {
  getEntityServiceToken,
  provideEntityService,
} from './provide-entity-service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import type { DataSourceModuleOptions } from './data-source-options.js';
import { getDataSourceOptions } from './data-source-options.js';

@Module({})
export class DataSourceModule implements OnModuleInit {
  static forRoot(options: DataSourceModuleOptions): DynamicModule {
    return {
      global: true,
      module: DataSourceModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: DataSource,
          inject: [ConfigService],
          durable: true,
          // useValue: new DataSource(getDataSourceOptions(options)),
          useFactory(config: ConfigService) {
            return new DataSource(getDataSourceOptions(config, options));
          },
        },
      ],
      exports: [DataSource],
    };
  }

  static forFeature(options: DataSourceModuleOptions): DynamicModule {
    const { entities } = options;
    const entityServiceProviders = entities.map((entity) =>
      provideEntityService(() => entity),
    );

    const entityServiceTokens = entities.map((entity) =>
      getEntityServiceToken(() => entity),
    );

    return {
      module: DataSourceModule,
      providers: [...entityServiceProviders],
      exports: [...entityServiceTokens],
    };
  }

  constructor(protected readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }
}
