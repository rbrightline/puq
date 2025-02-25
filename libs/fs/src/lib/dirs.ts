import { debug, end, start } from '@puq/debug';
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { scope } from './scope.js';
import { rval } from '@puq/is';

/**
 * Find all directories in the target directory (only directories)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function dirs(directory = '.'): Promise<string[]> {
  start('dirs');
  rval(directory);
  debug({ directory });

  const resolve = scope();

  directory = resolve(directory);

  const __dirs = await readdir(directory);

  debug({ foundDirectories: __dirs });

  const fileAndStatsPromise = __dirs.map(async (filename) => {
    return [filename, await stat(resolve(directory, filename))] as [
      string,
      Stats
    ];
  });

  const filesStats = await Promise.all(fileAndStatsPromise);

  const foundDirectories = filesStats
    .filter(([f, s]) => s.isDirectory())
    .map(([f]) => f);

  debug({ foundDirectories });

  end();

  return foundDirectories;
}
