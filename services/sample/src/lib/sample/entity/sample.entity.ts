import type { SampleObj, SampleRawModel } from '@puq/model';
import { BaseEntity, Column, Entity } from '@puq/orm';
import { SampleObjectDto } from '../dto/create-sample.dto.js';

@Entity()
export class Sample extends BaseEntity implements SampleRawModel {
  @Column({ type: 'string' }) stringValue: string;

  @Column({ type: 'number' }) numberValue: number;

  @Column({ type: 'integer' }) integerValue: number;

  @Column({ type: 'boolean' }) booleanValue: boolean;

  @Column({ type: 'date' }) dateValue: Date;

  @Column({ type: 'object', target: () => SampleObjectDto })
  objectValue: SampleObj;

  @Column({ type: 'array', items: { type: 'string' } }) stringArray: string[];

  @Column({ type: 'array', items: { type: 'number' } }) numberArray: number[];

  @Column({ type: 'array', items: { type: 'integer' } }) integerArray: number[];

  @Column({ type: 'array', items: { type: 'boolean' } })
  booleanArray: boolean[];

  @Column({
    type: 'array',
    items: { type: 'object', target: () => SampleObjectDto },
  })
  objectArray: SampleObj[];

  @Column({ type: 'array', items: { type: 'date' } }) dateArray: Date[];
}
