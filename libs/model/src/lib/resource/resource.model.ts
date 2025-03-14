import type { ResourceRawModel } from './resource-raw.model.js';
import type { BaseModel } from '@puq/type';

/**
 * All properties of Resource. This is the type to implement to create the database `entity` class
 */
export type ResourceModel = BaseModel & ResourceRawModel;
