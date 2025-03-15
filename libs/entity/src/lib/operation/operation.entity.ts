import type { OperationModel } from '@puq/model';
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Operation extends BaseEntity implements OperationModel {
  @Column({ type: 'string', required: true, unique: true, maxLength: 50 })
  name: string;
}
