import { Property } from '@puq/property';
import { BaseModel } from '@puq/type';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * All entities extends this entity. The entity provides id, createdAt, updatedAt, and deletedAt columns
 */
export class BaseEntity implements BaseModel {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;

  @Property({ type: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  @Property({ type: 'date' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Property({ type: 'date' })
  @DeleteDateColumn()
  deletedAt: Date;
}

export const BASE_ENTITY_COLUMNS = Object.keys(new BaseEntity());
