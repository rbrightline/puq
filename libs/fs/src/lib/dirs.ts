import { def } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';
import { IOptions } from './io-options.js';

/**
 * List all directories under the provided {@link root} directory
 * @param root root directory to search for sub directories
 * @returns list of directory paths
 */
export async function dirs(
  root: string,
  options?: IOptions
): Promise<string[]> {
  root = resolve(root);
  const __readdir = await readdir(root);
  const __readdirAsync = __readdir.map(async (dirpath) => {
    dirpath = resolve(root, dirpath);

    const dirStat = await stat(dirpath);

    if (!dirStat.isDirectory()) return undefined;

    if (options?.recursive === true) {
      const found = await dirs(dirpath, options);
      return [dirpath, ...found];
    } else {
      return [dirpath];
    }
  });

  const foundDirs = await Promise.all(__readdirAsync);

  const preresult = foundDirs.flat().filter(def);

  if (options?.fullpath == true) return preresult;

  return preresult.map((e) => normalize(e.replace(root, './')));
}
