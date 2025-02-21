import { Property } from '@puq/property';
import { BaseModel } from '@puq/type';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity implements BaseModel {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;

  @Property({ type: 'date' })
  @CreateDateColumn({ type: 'varchar', length: 30 })
  createdAt: Date;

  @Property({ type: 'date' })
  @UpdateDateColumn({ type: 'varchar', length: 30 })
  updatedAt: Date;

  @Property({ type: 'date' })
  @DeleteDateColumn({ type: 'varchar', length: 30 })
  deletedAt: Date;
}

export const BASE_ENTITY_COLUMNS = Object.keys(new BaseEntity());
