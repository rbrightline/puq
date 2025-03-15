import { CreateQueryCountDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Operation } from './operation.entity.js';

@Dto()
export class QueryCountOperationDto extends CreateQueryCountDto({
  entity: Operation,
}) {}
