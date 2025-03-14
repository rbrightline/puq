import type { BaseModel } from '@puq/type';
import { ViewColumn } from './../decorator/view-column.js';

/**
 * Base view entity that includes `id` and `timestamp` columns
 */
export class BaseView implements BaseModel {
  @ViewColumn({ type: 'integer' }) id: number;
  @ViewColumn({ type: 'date' }) createdAt: string;
  @ViewColumn({ type: 'date' }) updatedAt: string;
  @ViewColumn({ type: 'date' }) deletedAt: string;
}
