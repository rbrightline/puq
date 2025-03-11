import { Dto, Property } from '@puq/property';

@Dto()
export class IDDto {
  @Property({ type: 'integer', minimum: 1, required: true })
  id: number;
}
