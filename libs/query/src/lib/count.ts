export type QueryCount<Where> = {
  withDeleted?: boolean;
  query?: Where;
  where?: Where;
};
