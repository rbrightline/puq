import type { CategoryViewModel } from '@puq/model';
import { ViewEntity, BaseView } from '@puq/orm';
import { Category } from './category.entity.js';

@ViewEntity((builder) => {
  return builder.from(Category, 'm');
})
export class CategoryView extends BaseView implements CategoryViewModel {}
