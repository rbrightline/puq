import { CreateQueryOneDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Resource } from './resource.entity.js';

@Dto()
export class QueryOneResourceDto extends CreateQueryOneDto({
  entity: Resource,
}) {}
