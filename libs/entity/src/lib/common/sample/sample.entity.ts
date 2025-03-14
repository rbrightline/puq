import type { SampleModel, SampleObj } from '@puq/model';
import { Entity, Column, BaseEntity } from '@puq/orm';
import { SampleObjDto } from './create-sample.dto.js';

@Entity()
export class Sample extends BaseEntity implements SampleModel {
  @Column({ type: 'string' }) stringValue: string;
  @Column({ type: 'number' }) numberValue: number;
  @Column({ type: 'integer' }) integerValue: number;
  @Column({ type: 'boolean' }) booleanValue: boolean;
  @Column({ type: 'date' }) dateValue: string;

  @Column({ type: 'object', target: () => SampleObjDto })
  objectValue: SampleObj;
  @Column({ type: 'array', items: { type: 'string' } }) stringArray: string[];
  @Column({ type: 'array', items: { type: 'number' } }) numberArray: number[];
  @Column({ type: 'array', items: { type: 'integer' } }) integerArray: number[];
  @Column({ type: 'array', items: { type: 'boolean' } })
  booleanArray: boolean[];
  @Column({
    type: 'array',
    items: { type: 'object', target: () => SampleObjDto },
  })
  objectArray: SampleObj[];
  @Column({ type: 'array', items: { type: 'date' } }) dateArray: string[];
}
