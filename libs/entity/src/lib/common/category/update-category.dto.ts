import { Dto, Property } from '@puq/property';

@Dto()
export class UpdateCategoryDto {
  @Property({ type: 'string' })
  name: string;
}
