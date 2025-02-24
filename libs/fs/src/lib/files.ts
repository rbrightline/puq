import { debug, end, start } from '@puq/debug';
import { def, rval } from '@puq/is';
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { extname, join } from 'path';
import { scope } from './scope.js';
/**
 * Find all files in the target directory (only files)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function files(
  directory = '.',
  extention?: string
): Promise<string[]> {
  start('files');
  debug({ directory, extention });
  directory = scope()(rval(directory));
  const found = await readdir(directory);

  debug({ directory, extention });

  const filesStatsPromise = found.map(async (filename) => {
    return [filename, await stat(join(directory, filename))] as [string, Stats];
  });

  const filesStats = await Promise.all(filesStatsPromise);

  let filteredFilesStats = filesStats.filter(([f, s]) => s.isFile());

  if (def(extention))
    filteredFilesStats = filteredFilesStats.filter(
      ([f]) => extname(f) === extention
    );

  const foundFileNames = filteredFilesStats.map(([f]) => f);

  debug({ foundFileNames });

  end();
  return foundFileNames;
}
