import { Type } from '@nestjs/common';
import { ResourceMetadataManager } from './resource-metadata.js';

export type SetResourceMetadataOptions = {
  /**
   * Factory function that returns resource entity class
   */
  entity: () => Type;

  /**
   * Defines the public resource
   */
  isPublic?: boolean;
};

/**
 * Set metadata for the resource controlller that method and class decorator can access using {@link ResourceMetadataManager}
 * This decorator must be used as the first property of the resource controller class
 * ```ts
 * class ResourceController {
 *   `@SetResourceMetadata(()=>EntityClass)`
 *    __metadata__:any;
 * }
 * ```
 * @param entity
 * @returns - {@link PropertyDecorator}
 */
export function SetResourceMetadata(
  options: Readonly<SetResourceMetadataOptions>,
): PropertyDecorator {
  return (target) => {
    ResourceMetadataManager.set({
      target,
      entity: options.entity,
      isPublic: !!options.isPublic,
    });
  };
}
