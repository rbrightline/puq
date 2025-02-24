import { debug, end, start } from '@puq/debug';
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { scope } from './scope.js';
import { rval } from '@puq/is';

/**
 * Find all directories in the target directory (only directories)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function dirs(directory = '.'): Promise<string[]> {
  start('dirs');

  debug({ directory });

  directory = scope()(rval(directory));

  debug({ directory });

  const foundDirs = await readdir(directory);

  const filesStatsPromise = foundDirs.map(async (filename) => {
    return [filename, await stat(join(directory, filename))] as [string, Stats];
  });

  const filesStats = await Promise.all(filesStatsPromise);

  const foundDirectories = filesStats
    .filter(([f, s]) => s.isDirectory())
    .map(([f]) => f);

  debug({ foundDirectories });

  end();

  return foundDirectories;
}
