import { rval } from '@puq/is';
import { stat } from 'fs/promises';
import { scope } from './scope.js';
import {} from 'repl';
import { debug, start, end } from '@puq/debug';

/**
 * Checkt he filepath is a directory
 * @param filepath
 * @returns
 */
export async function isDir(filepath: string): Promise<boolean> {
  start(isDir.name);
  filepath = rval(filepath);
  debug({ filepath });

  const resolve = scope();
  filepath = resolve(filepath);
  debug({ filepath });

  const s = await stat(filepath);
  const __isDirectory = s.isDirectory();

  debug({ isDirectory: __isDirectory });
  end();

  return __isDirectory;
}
