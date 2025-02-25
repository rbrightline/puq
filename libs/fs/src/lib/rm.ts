import { rval } from '@puq/is';
import { scope } from './scope.js';
import { rm as __rm } from 'fs/promises';
import { debug, end, start } from '@puq/debug';

export type RmOptions = {
  recursive?: boolean;
};
/**
 * Remove files under the file system scope
 * @param filepath
 * @throws {@link AccessDeniedError}
 */
export async function rm(filepath: string, options?: RmOptions): Promise<void> {
  start(rm.name);

  filepath = rval(filepath);
  debug({ filepath });
  const resolve = scope();
  filepath = resolve(filepath);
  debug({ filepath });
  end();
  await __rm(filepath, { recursive: true, maxRetries: 2, retryDelay: 100 });
}
