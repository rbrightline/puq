import type { PermissionRawModel } from './permission-raw.model.js';
import type { BaseModel } from '@puq/type';
import type { ResourceModel } from '../resource/resource.model.js';
import type { OperationModel } from '../operation/operation.model.js';

/**
 * All properties of Permission. This is the type to implement to create the database `entity` class
 */
export type PermissionModel = BaseModel &
  PermissionRawModel<ResourceModel, OperationModel>;
