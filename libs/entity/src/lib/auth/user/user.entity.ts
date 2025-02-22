import { Entity, Column, BaseEntity, Relation } from '@puq/orm';
import { Role } from '../role/role.entity.js';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'string', unique: true, readonly: true })
  username: string;

  @Column({ type: 'string', unique: true })
  password: string;

  @Relation('many-to-many', () => Role, {
    eager: true,
    onDelete: 'SET NULL',
    join: true,
    nullable: true,
  })
  roles: Role[];
}
