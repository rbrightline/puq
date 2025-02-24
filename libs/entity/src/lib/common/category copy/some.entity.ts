import { CategoryModel } from '@puq/model';
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'string', unique: true, readonly: true }) name: string;
}
