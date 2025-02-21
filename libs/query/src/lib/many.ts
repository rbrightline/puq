import { OrderDirection, OrderNulls } from './order.js';

export class QueryMany<Entity, Where> {
  skip?: number;
  take?: number;
  select?: (keyof Entity)[];
  where?: Where;
  query?: Where;
  orderBy?: keyof Entity;
  orderDir?: OrderDirection;
  orderNulls?: OrderNulls;
  withDeleted?: boolean;
}
