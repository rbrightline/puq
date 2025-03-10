import {
  ResourceMetadataManager,
  type ResourceMetadataOptions,
} from './resource-metadata-manager.js';

export type SetResourceMetadataOptions<T extends object> = Readonly<
  Omit<ResourceMetadataOptions<T>, 'target'>
>;

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
export function SetResourceMetadata<T extends object>(
  options: SetResourceMetadataOptions<T>,
): PropertyDecorator {
  return (target) => {
    ResourceMetadataManager.set({
      ...options,
      target,
      isPublic: !!options.isPublic,
    });
  };
}
