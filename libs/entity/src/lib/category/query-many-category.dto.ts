import { CreateQueryManyDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Category } from './category.entity.js';

@Dto()
export class QueryManyCategoryDto extends CreateQueryManyDto({
  entity: Category,
}) {}
