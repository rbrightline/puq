import { def } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';

export type DirsOptions = {
  /**
   * if true, sub directories are listed as well.
   */
  recursive?: boolean;

  /**
   * if true, output will be a list of relative path of the directories
   */
  fullpath?: boolean;
};

/**
 * List all all directories under {@link directory}
 * @param directory target directory
 * @returns the list of directories (not inluding files). If the recursive options is set true, then the result includes sub directories as well.
 */
export async function dirs(
  directory: string,
  options?: DirsOptions
): Promise<string[]> {
  directory = resolve(directory);
  const __readdir = await readdir(directory);
  const __readdirAsync = __readdir.map(async (dirpath) => {
    dirpath = resolve(directory, dirpath);

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

  return preresult.map((e) => normalize(e.replace(directory, './')));
}
