import { isDefined } from '@puq/is';
import { readdir, stat } from 'fs/promises';
import { normalize } from 'path';
import type { CommonFileOptions } from './common-file-options.js';
import { scope } from './scope.js';
import { cwd } from 'process';

/**
 * Asynchronously retrieves an array of file paths starting from a root directory.
 * Supports recursive searching and can return either absolute or relative paths.
 *
 * @param root - The root directory path to start the search from. Can be relative or absolute.
 * @param options - Optional configuration for file traversal
 * @returns A promise that resolves to an array of file paths
 *
 * @example
 * // Basic usage - get files in directory with relative paths
 * const fileList = await files('./src');
 * // Returns: ['./src/file1.txt', './src/file2.js']
 *
 * @example
 * // Recursive search with absolute paths
 * const allFiles = await files('/project', {
 *   recursive: true,
 *   absolutePath: true
 * });
 * // Returns: ['/project/file1.txt', '/project/subdir/file2.js', ...]
 */
export async function files(
  root: string,
  options?: CommonFileOptions,
): Promise<string[]> {
  const resolve = scope(cwd());
  root = resolve(root);
  const foundFilesAndDirectories = await readdir(root);

  const foundFilesAndDirectoriesPromises = foundFilesAndDirectories.map(
    async (filepath) => {
      filepath = resolve(root, filepath);
      const fileStat = await stat(filepath);

      if (fileStat.isFile()) {
        return filepath;
      } else if (fileStat.isDirectory() && options?.recursive === true) {
        const found = await files(filepath, { ...options, absolutePath: true });
        return [...found];
      }

      return undefined;
    },
  );

  const foundDirectories = await Promise.all(foundFilesAndDirectoriesPromises);

  const flatFoundDirectories = foundDirectories.flat().filter(isDefined);

  if (options?.absolutePath == true) return flatFoundDirectories;

  return flatFoundDirectories.map((e) => normalize(e.replace(root, './')));
}
