import type { OperationRawModel } from './operation-raw.model.js';
import type { BaseModel } from '@puq/type';

/**
 * All properties of Operation. This is the type to implement to create the database `entity` class
 */
export type OperationModel = BaseModel & OperationRawModel;
