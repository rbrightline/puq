import { CreateQueryManyDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { keys } from '@puq/is';
import { Sample } from './sample.entity.js';

@Dto()
export class QueryManySampleDto extends CreateQueryManyDto({
  columns: keys(Sample),
}) {}
