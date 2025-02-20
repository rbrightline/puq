export type QueryCount<Where> = {
  withDeleted?: boolean;
  query?: string;
  where?: Where;
};
