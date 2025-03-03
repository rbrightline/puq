import { CreateSampleModel, SampleObj } from '@puq/model';
import { Dto, Property } from '@puq/property';

@Dto()
export class SampleObjectDto implements SampleObj {
  @Property({ type: 'string', required: true }) value: string;
}

@Dto()
export class CreateSampleDto implements CreateSampleModel {
  @Property({ type: 'string', required: true }) str: string;

  @Property({ type: 'number', required: true }) num: number;

  @Property({ type: 'integer', required: true }) int: number;

  @Property({ type: 'boolean', required: true }) bool: boolean;

  @Property({ type: 'date', required: true }) date: Date;

  @Property({ type: 'object', required: true, target: () => SampleObjectDto })
  obj: SampleObjectDto;

  @Property({
    type: 'array',
    required: true,
    items: { type: 'string', required: true },
  })
  strArr: string[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'number', required: true },
  })
  numArr: number[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'number', required: true },
  })
  intArr: number[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'boolean', required: true },
  })
  boolArr: boolean[];

  @Property({
    type: 'array',
    required: true,
    items: { type: 'object', required: true, target: () => SampleObjectDto },
  })
  objArr: SampleObjectDto[];

  @Property({ type: 'array', required: true, items: { type: 'date' } })
  dateArr: Date[];
}
