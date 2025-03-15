import type { CreateResourceModel } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class CreateResourceDto implements CreateResourceModel {
  @Property({ type: 'string', required: true, unique: true, maxLength: 50 })
  name: string;
}
