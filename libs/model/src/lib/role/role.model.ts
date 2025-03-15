import type { RoleRawModel } from './role-raw.model.js';
import type { BaseModel } from '@puq/type';
import type { PermissionModel } from '../permission/permission.model.js';

/**
 * All properties of Role. This is the type to implement to create the database `entity` class
 */
export type RoleModel = BaseModel & RoleRawModel<PermissionModel>;
