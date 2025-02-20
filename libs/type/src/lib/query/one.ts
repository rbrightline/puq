import { Keys } from '../utils/keys.js';

export class QueryOne<Entity, Where> {
  select?: Keys<Entity>;
  query?: string;
  where?: Where;
  withDeleted?: boolean;
}
