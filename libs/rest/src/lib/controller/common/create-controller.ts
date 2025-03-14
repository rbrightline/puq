import type { BaseModel, Type } from '@puq/type';
import type { SetResourceMetadataOptions } from '@puq/meta';
import { type EntityService } from '@puq/orm';

class __ControllerClass<T extends BaseModel> {
  constructor(public readonly service: EntityService<T>) {}
}
/**
 * Create controller class. This factory function allows us to set the resource metadata for the controller
 * @param options - {@link SetResourceMetadataOptions}
 * @returns - controller class
 */
export function CreateController<
  T extends BaseModel,
  Options extends SetResourceMetadataOptions<T> = SetResourceMetadataOptions<T>,
>(options: Options): Type<__ControllerClass<T>> {
  class ControllerClass extends __ControllerClass<T> {}

  return ControllerClass;
}
