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
  createdAt: string;

  @Property({ type: 'date' })
  @UpdateDateColumn()
  updatedAt: string;

  @Property({ type: 'date' })
  @DeleteDateColumn()
  deletedAt: string;
}

export const BASE_ENTITY_COLUMNS = Object.keys(new BaseEntity());
