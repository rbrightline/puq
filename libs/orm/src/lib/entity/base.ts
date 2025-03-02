import type { BaseModel } from '@puq/type';
import { Property } from '@puq/property';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseIdEntity } from './base-id.js';

/**
 * All entities extends this entity. The entity provides id, createdAt, updatedAt, and deletedAt columns
 */
export class BaseEntity extends BaseIdEntity implements BaseModel {
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
