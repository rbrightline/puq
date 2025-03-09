import { CreateQueryCountDto } from '@puq/orm';
import { Dto } from '@puq/property';

@Dto()
export class QueryOneSampleDto extends CreateQueryCountDto({
  columns: [],
}) {}
