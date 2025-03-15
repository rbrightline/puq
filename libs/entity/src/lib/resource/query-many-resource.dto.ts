import { CreateQueryManyDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Resource } from './resource.entity.js';

@Dto()
export class QueryManyResourceDto extends CreateQueryManyDto({
  entity: Resource,
}) {}
