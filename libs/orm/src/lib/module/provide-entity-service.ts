import type { Provider, Type } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { EntityService } from '../service/entity.service.js';
import { ResourceMetadataManager } from '@puq/meta';
/**
 * Get the entity service token
 * @param entity - entity class
 * @returns - entity service tokenF
 */
export function getEntityServiceToken<T>(entity: () => Type<T>): string {
  return `${entity().name}EntityService`;
}

/**
 * Provide entity service
 * @param entity  - entity class
 * @param service - entity service
 * @returns - Provider
 */
export function provideEntityService(entity: () => Type): Provider {
  return {
    inject: [DataSource],
    provide: getEntityServiceToken(entity),
    useFactory(dataSource: DataSource) {
      return new EntityService(dataSource.getRepository(entity()));
    },
  };
}

/**
 * Inject entity service
 * @param entity entity class
 * @returns - Parameter decorator
 */
export function InjectEntityService(): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    Inject(getEntityServiceToken(ResourceMetadataManager.get(args[0]).entity))(
      ...args,
    );
  };
}
