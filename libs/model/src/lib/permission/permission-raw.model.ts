import type { IDModel } from '@puq/type';

/**
 * The own properties of Permission without `timestamp` and `id` properties
 */
export type PermissionRawModel<Resource = IDModel, Operation = IDModel> = {
  resource?: Resource;
  operation?: Operation;
};
