export class QueryOne<Entity, Where, Query> {
  select?: (keyof Entity)[];
  query?: Query;
  where?: Where;
  withDeleted?: boolean;
}
