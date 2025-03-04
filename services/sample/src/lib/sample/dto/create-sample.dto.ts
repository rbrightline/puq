import { CreateSampleModel, SampleObj } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class SampleObjectDto implements SampleObj {
  @Property({ type: 'string', required: true }) value: string;
}

@Dto()
export class CreateSampleDto implements CreateSampleModel {
  @Property({ type: 'string', required: true }) stringValue: string;

  @Property({ type: 'number', required: true }) numberValue: number;

  @Property({ type: 'integer', required: true }) integerValue: number;

  @Property({ type: 'boolean', required: true }) booleanValue: boolean;

  @Property({ type: 'date', required: true }) dateValue: Date;

  @Property({ type: 'object', required: true, target: () => SampleObjectDto })
  objectValue: SampleObjectDto;

  @Property({
    type: 'array',
    required: true,
    items: { type: 'string', required: true },
  })
  stringArray: string[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'number', required: true },
  })
  numberArray: number[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'number', required: true },
  })
  integerArray: number[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'boolean', required: true },
  })
  booleanArray: boolean[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'object', required: true, target: () => SampleObjectDto },
  })
  objectArray: SampleObjectDto[];

  @Property({ type: 'array', required: true, items: { type: 'date' } })
  dateArray: Date[];
}
