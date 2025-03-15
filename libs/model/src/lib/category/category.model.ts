import type { CategoryRawModel } from './category-raw.model.js';
import type { BaseModel } from '@puq/type';

/**
 * All properties of Category. This is the type to implement to create the database `entity` class
 */
export type CategoryModel = BaseModel & CategoryRawModel;
