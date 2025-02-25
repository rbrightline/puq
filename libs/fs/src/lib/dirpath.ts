import { end, start, debug } from '@puq/debug';
import { rval } from '@puq/is';
import { scope } from './scope.js';

/**
 * Extract the dirpath from the filepath
 * @param filepath filename
 * @returns
 */
export function dirpath(filepath: string) {
  start(dirpath.name);

  filepath = rval(filepath);

  debug({ filepath });

  const resolve = scope();

  filepath = resolve(filepath);

  const __dirpath = resolve(filepath.split('\\').slice(0, -1).join('\\'));

  debug({ dirpath: __dirpath });

  end();

  return __dirpath;
}
