import type { SetResourceMetadataOptions } from '@puq/meta';
import { type DynamicModule, Module } from '@nestjs/common';
import { BasicResourceController } from './basic-resource.controller.js';
import { getEntityServiceToken, provideEntityService } from '@puq/provider';
import { EntityService } from '@puq/orm';

@Module({})
export class BasicResourceModule {
  static configure<T extends object>(
    options: SetResourceMetadataOptions<T>,
  ): DynamicModule {
    return {
      module: BasicResourceModule,
      controllers: [BasicResourceController(options)],
      providers: [provideEntityService(options.entity(), EntityService)],
      exports: [getEntityServiceToken(options.entity())],
    };
  }
}
