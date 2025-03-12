import { cwd } from '@puq/gen-helper';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function repositoryName() {
  const __packageJSON = await readFile(join(cwd(), 'package.json'));
  const packageJSON = JSON.parse(__packageJSON.toString());
  return (packageJSON.name as string).split('/')[0].slice(1);
}
