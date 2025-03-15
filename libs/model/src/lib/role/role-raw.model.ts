import type { IDModel } from '@puq/type';

/**
 * The own properties of Role without `timestamp` and `id` properties
 */
export type RoleRawModel<Permission = IDModel> = {
  name: string;
  description?: string;
  permissions?: Permission[];
};
