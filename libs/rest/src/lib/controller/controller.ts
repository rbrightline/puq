import { Controller as Resource } from '@nestjs/common';
import { ApiBearerAuth as Bearer, ApiTags as Tags } from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';

/**
 * Define resource controller
 * @returns -  {@link ClassDecorator}
 */
export function Controller(): ClassDecorator {
  return (target) => {
    const M = Meta.get(target);
    Resource()(target);
    Bearer()(target);
    Tags(M.names.controllerName)(target);
  };
}
