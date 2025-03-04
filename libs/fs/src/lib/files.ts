import { isDefined } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * List all files under the provided {@link root} directory
 * @param root root directory to search for files
 * @returns list of file paths
 */
export async function files(
  root: string,
  options?: CommonFileOptions,
): Promise<string[]> {
  root = resolve(root);

  const __readdir = await readdir(root);

  const __readdirAsync = __readdir.map(async (filepath) => {
    filepath = resolve(root, filepath);
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

  const preresult = foundDirs.flat().filter(isDefined);

  if (options?.fullpath == true) return preresult;

  return preresult.map((e) => normalize(e.replace(root, './')));
}
