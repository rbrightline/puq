import type { CategoryModel } from '@puq/model';
import { ViewEntity, BaseView, ViewColumn } from '@puq/orm';
import { Category } from './category.entity.js';

@ViewEntity((builder) =>
  builder.addSelect('m.name', 'name').from(Category, 'm'),
)
export class CategoryView extends BaseView implements CategoryModel {
  @ViewColumn({ type: 'string' }) name: string;
}
