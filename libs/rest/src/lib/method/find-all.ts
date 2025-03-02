import { Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommonMethod } from './common.js';
import { ResourceMetadataManager } from '../meta/resource-metadata.js';

/**
 * Decorates a method to define a GET endpoint that returns all instances of a resource.
 * Applies common REST API configurations using metadata from ResourceMetadataManager.
 * @returns A method decorator that configures the endpoint with GET and Swagger response metadata.
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
