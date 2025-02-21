export type QueryCount<Where, Query> = {
  withDeleted?: boolean;
  query?: Query;
  where?: Where;
};
