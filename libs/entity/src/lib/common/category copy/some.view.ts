import { CategoryViewModel } from '@puq/model';
import { ViewEntity, BaseView, ViewColumn } from '@puq/orm';
import { Category } from './category.entity.js';

@ViewEntity((q) => q.addSelect('m.name', 'name').from(Category, 'm'))
export class CategoryView extends BaseView implements CategoryViewModel {
  @ViewColumn({ type: 'string' }) name: string;
}
