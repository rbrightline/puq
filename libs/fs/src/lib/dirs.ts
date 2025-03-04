import { isDefined } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * Asynchronously retrieves an array of directory paths starting from a root directory.
 * Can operate recursively and return either absolute or relative paths based on options.
 *
 * @param root - The root directory path to start the search from
 * @param options - Optional configuration for directory traversal
 * @returns A promise that resolves to an array of directory paths
 *
 * @example
 * // Basic usage - get immediate subdirectories with relative paths
 * const dirsList = await dirs('/path/to/root');
 * // Returns: ['./dir1', './dir2']
 *
 * @example
 * // Recursive with absolute paths
 * const allDirs = await dirs('/path/to/root', {
 *   recursive: true,
 *   absolutePath: true
 * });
 * // Returns: ['/path/to/root/dir1', '/path/to/root/dir1/sub directories', ...]
 */
export async function dirs(
  root: string,
  options?: CommonFileOptions,
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

  const preresult = foundDirs.flat().filter(isDefined);

  if (options?.absolutePath == true) return preresult;

  return preresult.map((e) => normalize(e.replace(root, './')));
}
