import { OrderDirection, OrderNulls } from './order.js';

export class QueryMany<Entity, Where, Query> {
  skip?: number;
  take?: number;
  select?: (keyof Entity)[];
  where?: Where;
  query?: Query;
  orderBy?: keyof Entity;
  orderDir?: OrderDirection;
  orderNulls?: OrderNulls;
  withDeleted?: boolean;
}
