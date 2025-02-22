import { Entity, Column, BaseEntity, Relation } from '@puq/orm';
import { Permission } from '../permission/permission.entity.js';

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'string', unique: true, readonly: true })
  name: string;

  @Relation('many-to-many', () => Permission, {
    eager: true,
    onDelete: 'SET NULL',
    join: true,
    nullable: true,
  })
  permissions: Permission[];
}
