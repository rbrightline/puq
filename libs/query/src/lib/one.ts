export class QueryOne<Entity, Where> {
  select?: (keyof Entity)[];
  query?: Where;
  where?: Where;
  withDeleted?: boolean;
}
