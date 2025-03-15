import type { UserRawModel } from './user-raw.model.js';
import type { BaseModel } from '@puq/type';
import type { RoleModel } from '../role/role.model.js';

/**
 * All properties of User. This is the type to implement to create the database `entity` class
 */
export type UserModel = BaseModel & UserRawModel<RoleModel>;
