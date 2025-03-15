import type { CreateOperationModel } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class CreateOperationDto implements CreateOperationModel {
  @Property({ type: 'string', required: true, unique: true, maxLength: 50 })
  name: string;
}
