import { IDModel } from './id.js';
import { TimestampModel } from './timestamp.js';

export type BaseModel = IDModel & TimestampModel;
