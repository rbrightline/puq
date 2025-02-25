import { debug, start } from '@puq/debug';
import { mkdir as __mkdir } from 'fs/promises';
import { scope } from './scope.js';
import { rval } from '@puq/is';

/**
 * Create directory recursively and securely
 * @param directory directory path such as `./first/second/third/fourth/fifth...'
 */
export async function mkdir(directory: string): Promise<void | never> {
  start(mkdir.name);
  directory = rval(directory);
  debug({ directory });
  const resolve = scope();
  directory = resolve(directory);
  debug({ directory });
  await __mkdir(directory, { recursive: true });
}
