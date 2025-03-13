import type { ClassDecoratorParam } from '@puq/type';
import { Controller as __Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';

/**
 * Define resource controller
 * @returns - {@link ClassDecorator}
 */
export function Controller(): ClassDecorator {
  return (...args: ClassDecoratorParam) => {
    const M = ResourceMetadataManager.get(...args);
    __Controller()(...args);
    ApiBearerAuth()(...args);
    ApiTags(M.names.controllerName)(...args);
  };
}
