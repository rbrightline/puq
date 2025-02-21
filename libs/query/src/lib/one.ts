export class QueryOne<Entity, Where> {
  select?: (keyof Entity)[];
  where?: Where;
  withDeleted?: boolean;
}
