import { def } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';

export type FilesOptions = {
  recursive?: boolean;
  fullpath?: boolean;
};

/**
 * Find all files in the target directory (only files)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function files(
  directory: string,
  options?: FilesOptions
): Promise<string[]> {
  directory = resolve(directory);

  const __readdir = await readdir(directory);

  const __readdirAsync = __readdir.map(async (filepath) => {
    filepath = resolve(directory, filepath);
    const fileStat = await stat(filepath);

    if (fileStat.isFile()) {
      return filepath;
    } else if (fileStat.isDirectory() && options?.recursive === true) {
      const found = await files(filepath, { ...options, fullpath: true });
      return [...found];
    }

    return undefined;
  });

  const foundDirs = await Promise.all(__readdirAsync);

  const preresult = foundDirs.flat().filter(def);

  if (options?.fullpath == true) return preresult;

  return preresult.map((e) => normalize(e.replace(directory, './')));
}
