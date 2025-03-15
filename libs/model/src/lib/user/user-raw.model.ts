import type { IDModel } from '@puq/type';

/**
 * The own properties of User without `timestamp` and `id` properties
 */
export type UserRawModel<Role = IDModel> = {
  username: string;
  password: string;
  roles?: Role[];
};
