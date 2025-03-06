import type { CreateSampleModel, SampleObj } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class SampleObjDto implements SampleObj {
  @Property({ type: 'string' })
  value: string;
}
@Dto()
export class CreateSampleDto implements CreateSampleModel {
  @Property({ type: 'array', required: true, items: { type: 'boolean' } })
  booleanArray: boolean[];
  @Property({ type: 'boolean', required: true }) booleanValue: boolean;
  @Property({ type: 'array', required: true, items: { type: 'date' } })
  dateArray: Date[];
  @Property({ type: 'date', required: true }) dateValue: Date;
  @Property({ type: 'array', required: true, items: { type: 'integer' } })
  integerArray: number[];
  @Property({ type: 'integer', required: true }) integerValue: number;
  @Property({ type: 'array', required: true, items: { type: 'number' } })
  numberArray: number[];
  @Property({ type: 'number', required: true }) numberValue: number;
  @Property({
    type: 'array',
    required: true,
    items: { type: 'object', target: () => SampleObjDto },
  })
  objectArray: SampleObj[];
  @Property({ type: 'object', required: true, target: () => SampleObjDto })
  objectValue: SampleObj;
  @Property({ type: 'array', required: true, items: { type: 'string' } })
  stringArray: string[];
  @Property({ type: 'string', required: true }) stringValue: string;
}
