export type RenameOptions = {
  from: string;
  to: string;
  partial?: boolean;
};

export async function rename(options: RenameOptions): Promise<void> {}
