import { CreateQueryCountDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Resource } from './resource.entity.js';

@Dto()
export class QueryCountResourceDto extends CreateQueryCountDto({
  entity: Resource,
}) {}
