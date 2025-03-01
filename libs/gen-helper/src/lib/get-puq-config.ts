import { workspaceRoot } from '@nx/devkit';
import { readJSONFile } from '@puq/fs';
import { PuqOptions } from '@puq/type';
import { join } from 'path';

/**
 * Get `puq` config from the root `package.json`
 * @returns
 */
export async function getPuqConfig(): Promise<PuqOptions> {
  return await readJSONFile(join(workspaceRoot, 'package.json'));
}
