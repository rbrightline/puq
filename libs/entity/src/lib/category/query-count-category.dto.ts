import { CreateQueryCountDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Category } from './category.entity.js';

@Dto()
export class QueryCountCategoryDto extends CreateQueryCountDto({
  entity: Category,
}) {}
