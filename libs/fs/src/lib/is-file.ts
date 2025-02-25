import { stat } from 'fs/promises';
import { scope } from './scope.js';
import { rval } from '@puq/is';
import { debug, end, start } from '@puq/debug';

/**
 * Check the path is file
 * @param filepath
 * @returns
 */
export async function isFile(filepath: string): Promise<boolean> {
  start(isFile.name);
  filepath = rval(filepath);
  debug({ filepath });
  const resolve = scope();
  debug({ filepath });
  filepath = resolve(filepath);
  debug({ filepath });
  const __stat = await stat(filepath);

  const result = __stat.isFile();

  debug({ isFile: result });
  end();
  return result;
}
