import type { CategoryModel } from '@puq/model';
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'string', required: true, unique: true, maxLength: 50 })
  name: string;
}
