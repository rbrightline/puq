import { CreateQueryOneDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Sample } from './sample.entity.js';

@Dto()
export class QueryOneSampleDto extends CreateQueryOneDto({
  entity: Sample,
}) {}
