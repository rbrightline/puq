import type { Provider, Type } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';
import type { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

export const ENTITY_SERVICE_TOKEN_SUFFIX = 'ENTITY_SERVICE';

/**
 * Get the entity service token
 * @param entity - entity class
 * @returns - entity service tokenF
 */
export function getEntityServiceToken<T>(entity: Type<T>): string {
  return `${entity.name}_${ENTITY_SERVICE_TOKEN_SUFFIX}`;
}

/**
 * Provide entity service
 * @param entity  - entity class
 * @param service - entity service
 * @returns - Provider
 */
export function provideEntityService(entity: Type, service: Type): Provider {
  return {
    inject: [getDataSourceToken()],
    provide: getEntityServiceToken(entity),
    useFactory(dataSource: DataSource) {
      const repository = dataSource.getRepository(entity);
      return new service(repository);
    },
  };
}

/**
 * Inject entity service
 * @param entity entity class
 * @returns - Parameter decorator
 */
export function InjectEntityService(entity: Type): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    Inject(getEntityServiceToken(entity))(...args);
  };
}
