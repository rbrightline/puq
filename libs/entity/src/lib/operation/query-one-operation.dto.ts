import { CreateQueryOneDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Operation } from './operation.entity.js';

@Dto()
export class QueryOneOperationDto extends CreateQueryOneDto({
  entity: Operation,
}) {}
