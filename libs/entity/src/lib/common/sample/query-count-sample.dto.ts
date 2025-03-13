import { CreateQueryCountDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Sample } from './sample.entity.js';

@Dto()
export class QueryCountSampleDto extends CreateQueryCountDto({
  entity: Sample,
}) {}
