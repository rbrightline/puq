import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'string', unique: true, readonly: true })
  name: string;
}
