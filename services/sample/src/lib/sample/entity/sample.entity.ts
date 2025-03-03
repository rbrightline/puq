import { BaseEntity, Column, Entity } from '@puq/orm';
import { SampleModelRaw } from '@puq/model';

@Entity()
export class Sample extends BaseEntity implements SampleModelRaw {
  @Column({ type: 'string' }) name: string;
}
