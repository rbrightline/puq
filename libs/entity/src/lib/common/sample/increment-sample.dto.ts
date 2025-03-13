import { CreateIncrementDecrementDto } from '@puq/orm';
import { Dto } from '@puq/property';
import type { Sample } from './sample.entity.js';

@Dto()
export class IncrementSampleDto extends CreateIncrementDecrementDto<Sample>([
  'numberValue',
  'integerValue',
]) {}
