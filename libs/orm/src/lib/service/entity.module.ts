import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Type } from '@puq/type';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  getEntityServiceToken,
  provideEntityService,
} from './provide-entity-service.js';
import { EntityService } from './entity.service.js';

/**
 * Entity module options
 */
export type EntityModuleOptions = {
  /**
   * Entity classes
   */
  entities: Type[];
};

/**
 * Entity module to provide data source and entity services
 */
@Module({})
export class EntityModule {
  static configure(options: EntityModuleOptions): DynamicModule {
    const serviceTokens = options.entities.map((entity) =>
      getEntityServiceToken(entity),
    );
    const serviceProviders = options.entities.map((entity) => {
      return provideEntityService(entity, EntityService);
    });
    return {
      module: EntityModule,
      imports: [TypeOrmModule.forFeature(options.entities)],
      providers: [...serviceProviders],
      exports: [...serviceTokens],
    };
  }
}
