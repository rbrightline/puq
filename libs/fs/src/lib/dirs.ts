import { debug } from '@puq/debug';
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

/**
 * Find all directories in the target directory (only directories)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function dirs(directory = '.'): Promise<string[]> {
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

  return foundDirectories;
}
