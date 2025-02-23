import { debug } from 'console';
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { extname, join } from 'path';
/**
 * Find all directories in the target directory (only directories)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function files(
  directory = '.',
  extention?: string
): Promise<string[]> {
  const found = await readdir(directory);

  debug({ directory, extention });

  const filesStatsPromise = found.map(async (filename) => {
    return [filename, await stat(join(directory, filename))] as [string, Stats];
  });

  const filesStats = await Promise.all(filesStatsPromise);

  let filteredFilesStats = filesStats.filter(([f, s]) => s.isFile());

  if (extention != undefined)
    filteredFilesStats = filteredFilesStats.filter(
      ([f]) => extname(f) === extention
    );

  const foundFileNames = filteredFilesStats.map(([f]) => f);

  debug({ foundFileNames });

  return foundFileNames;
}
