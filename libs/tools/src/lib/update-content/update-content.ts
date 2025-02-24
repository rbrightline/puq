import { dirs, scope } from '@puq/fs';

export async function update(directory: string) {
  directory = scope()(directory);
  const result = [];

  const projects = dirs(directory);
}
