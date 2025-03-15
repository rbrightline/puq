import { CreateQueryOneDto } from '@puq/orm';
import { Dto } from '@puq/property';
import { Category } from './category.entity.js';

@Dto()
export class QueryOneCategoryDto extends CreateQueryOneDto({
  entity: Category,
}) {}
