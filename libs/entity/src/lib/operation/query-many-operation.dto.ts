import { CreateQueryManyDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Operation } from './operation.entity.js';

@Dto()
export class QueryManyOperationDto extends CreateQueryManyDto({
  entity: Operation,
}) {}
