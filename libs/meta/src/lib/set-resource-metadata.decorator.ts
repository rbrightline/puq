import type { Type } from '@puq/type';
import { ResourceMetadataManager } from './resource-metadata-manager.js';

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
 * Set metadata for the resource controller that method and class decorator can access using {@link ResourceMetadataManager}
 * This decorator must be used as the first property of the resource controller class
 * ```ts
 * class ResourceController {
 *    '@SetResourceMetadata({
 *      entity:()=> EntityClass,
 *      isPublic:true (public resource)
 *    })
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
