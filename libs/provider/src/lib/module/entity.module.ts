import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { Type } from '@puq/type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from '@puq/orm';
import {
  getEntityServiceToken,
  provideEntityService,
} from '../service/provide-entity-service.js';
export type EntityModuleOptions = {
  entities: Type[];
};

@Module({})
export class EntityModule {
  static forFeature(options: EntityModuleOptions): DynamicModule {
    const { entities } = options;
    const entityServiceProviders = entities.map((entity) =>
      provideEntityService(entity, EntityService),
    );

    const entityServiceTokens = entities.map((entity) =>
      getEntityServiceToken(entity),
    );

    return {
      module: EntityModule,
      imports: [TypeOrmModule.forFeature(entities)],
      providers: [...entityServiceProviders],
      exports: [...entityServiceTokens],
    };
  }
}
