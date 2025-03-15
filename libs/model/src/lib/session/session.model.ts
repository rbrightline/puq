import type { SessionRawModel } from './session-raw.model.js';
import type { BaseModel } from '@puq/type';

/**
 * All properties of Session. This is the type to implement to create the database `entity` class
 */
export type SessionModel = BaseModel & SessionRawModel;
