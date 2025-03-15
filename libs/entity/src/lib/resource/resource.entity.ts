import type { ResourceModel } from '@puq/model';
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Resource extends BaseEntity implements ResourceModel {
  @Column({ type: 'string', required: true, unique: true, maxLength: 50 })
  name: string;
}
