import type { Type } from '@puq/type';
import type { SetResourceMetadataOptions } from '@puq/meta';
import { SetResourceMetadata } from '@puq/meta';

export function CreateController(
  options: Readonly<SetResourceMetadataOptions>,
): Type {
  class ControllerClass {
    @SetResourceMetadata(options)
    readonly __metadata__: unknown;
  }

  return ControllerClass;
}
