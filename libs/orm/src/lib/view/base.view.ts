import { ViewColumn } from './../decorator/view-column.js';

/**
 * Base view entity that includes `id` and `timestamp` columns
 */
export class BaseView {
  @ViewColumn({ type: 'integer' }) id: number;
  @ViewColumn({ type: 'date' }) createdAt: Date;
  @ViewColumn({ type: 'date' }) updatedAt: Date;
  @ViewColumn({ type: 'date' }) deletedAt: Date;
}
