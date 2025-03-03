import type { ClassDecoratorParam } from '@puq/type';
import { Controller as Resource } from '@nestjs/common';
import { ApiBearerAuth as Bearer, ApiTags as Tags } from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';

/**
 * Define resource controller
 * @returns - {@link ClassDecorator}
 */
export function Controller(): ClassDecorator {
  return (...args: ClassDecoratorParam) => {
    const M = Meta.get(...args);
    Resource()(...args);
    Bearer()(...args);
    Tags(M.names.controllerName)(...args);
  };
}
