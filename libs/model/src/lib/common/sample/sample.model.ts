import { BaseModel } from '@puq/type';
import { SampleRawModel } from './sample-raw.model.js';

export type SampleModel = BaseModel & SampleRawModel;
