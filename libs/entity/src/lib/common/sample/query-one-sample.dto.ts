import { CreateQueryOneDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Sample } from './sample.entity.js';
import { keys } from '@puq/is';

@Dto()
export class QueryOneSampleDto extends CreateQueryOneDto({
  columns: keys(Sample),
}) {}
