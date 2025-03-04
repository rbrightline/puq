import type { CommonFileOptions } from './common-file-options.js';
import { isDefined } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize, resolve } from 'path';
import { debug } from '@puq/debug';
import { toRelativePath } from './to-relative-path.js';
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
  debug({ root, options });

  root = resolve(root);

  debug(`Resolved root : ${root}`);

  const foundDirectoriesAndFiles = await readdir(root);

  debug(`readdir(root) : ${foundDirectoriesAndFiles}`);

  debug(`foundDirectoriesAndFiles.length = ${foundDirectoriesAndFiles.length}`);

  if (foundDirectoriesAndFiles.length == 0) {
    return foundDirectoriesAndFiles;
  }

  const foundDirectoriesAndFilesPromises = foundDirectoriesAndFiles.map(
    async (dirpath) => {
      dirpath = resolve(root, dirpath);

      debug(`Each ${dirpath}`);
      const dirStat = await stat(dirpath);

      debug(`stat(${dirpath}).isDirectory = ${dirStat.isDirectory()}`);

      if (!dirStat.isDirectory()) return undefined;

      if (options?.recursive === true) {
        const found = await dirs(dirpath, options);
        return [dirpath, ...found];
      } else {
        return [dirpath];
      }
    },
  );

  const foundDirs = await Promise.all(foundDirectoriesAndFilesPromises);

  debug(`FoundDirs : ${foundDirs}`);

  const definedItems = foundDirs.flat().filter((e) => isDefined(e));
  debug(`DefinedItems : ${definedItems}`);

  if (options?.absolutePath == true) return definedItems;

  return definedItems.map((e) => normalize(toRelativePath(root, e)));
}
