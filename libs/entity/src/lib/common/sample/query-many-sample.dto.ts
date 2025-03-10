import { CreateQueryManyDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Sample } from './sample.entity.js';

@Dto()
export class QueryManySampleDto extends CreateQueryManyDto({
  entity: Sample,
}) {}
