import { Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommonMethod } from './common.js';
import { ResourceMetadataManager } from '../meta/resource-metadata.js';

export type MethodDecoratorParam<T> = [
  object,
  string | symbol,
  TypedPropertyDescriptor<T>,
];
/**
 * Find all entities by query
 * @param entity function that return entity class
 * @returns
 */
export function FindAll(): MethodDecorator {
  return (target, property, descriptor) => {
    const { entity, paths } = ResourceMetadataManager.get(target.constructor);
    CommonMethod()(target, property, descriptor);
    Get(paths.plural)(target, property, descriptor);
    ApiOkResponse({ type: entity(), isArray: true })(
      target,
      property,
      descriptor,
    );
  };
}
