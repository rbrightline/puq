import type { Type } from '@puq/type';
import type { SetResourceMetadataOptions } from '@puq/meta';
import { SetResourceMetadata } from '@puq/meta';

/**
 * Create controller class. This factory function allows us to set the resource metadata for the controller
 * @param options - {@link SetResourceMetadataOptions}
 * @returns - controller class
 */
export function CreateController<T extends object>(
  options: SetResourceMetadataOptions<T>,
): Type {
  class ControllerClass {
    @SetResourceMetadata(options)
    readonly __metadata__: Type;
  }

  return ControllerClass;
}
