import type { CreateCategoryModel } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class CreateCategoryDto implements CreateCategoryModel {
  @Property({ type: 'string', required: true, maxLength: 50 }) name: string;
}
