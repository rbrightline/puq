import { Controller as __Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResourceMetadataManager } from '../meta/resource-metadata.js';

/**
 * Define resource controller
 * @returns -  {@link ClassDecorator}
 */
export function Controller(): ClassDecorator {
  return (target) => {
    const {
      names: { controllerName },
    } = ResourceMetadataManager.get(target);
    __Controller()(target);
    ApiBearerAuth()(target);
    ApiTags(controllerName)(target);
  };
}
