import { Keys } from '../utils/keys.js';

export class QueryMany<Entity, Where, Order> {
  skip?: number;
  take?: number;
  select?: Keys<Entity>;
  query?: Where;
  where?: Where;
  order?: Order;
  withDeleted?: boolean;
}
