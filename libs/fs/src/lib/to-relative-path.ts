import { throwInvalidParameterError } from '@puq/error';
import { debug } from 'console';
import { join, normalize } from 'path';

/**
 * Converts an absolute child path to a relative path based on a root path.
 * Ensures the child path is within the root path and returns a normalized relative path.
 *
 * @param rootPath - The root directory path to base the relative path on
 * @param childPath - The absolute path to convert to relative form
 * @returns A normalized relative path string
 * @throws - {@link Error} via {@link throwInvalidParameterError} - If the child path does not start with the root path
 *
 * @example
 * // Convert a child path to relative
 * const relative = toRelativePath('/project', '/project/src/file.txt');
 * // Returns: './src/file.txt'
 *
 * @example
 * // Throws error for invalid child path
 * toRelativePath('/project', '/other/file.txt');
 * // Throws: InvalidParameterError
 */
export function toRelativePath(rootPath: string, childPath: string) {
  debug({ rootPath, childPath });
  rootPath = normalize(rootPath.trim());
  childPath = normalize(childPath.trim());
  debug({ normalized: true, rootPath, childPath });

  if (join('\\', rootPath, childPath) === join('\\', childPath)) {
    return childPath;
  }

  if (!childPath.startsWith(rootPath))
    throwInvalidParameterError(`The child path must start with the root path`, {
      cause: 'Testing',
      data: { childPath, rootPath },
    });

  return normalize(childPath.replace(rootPath, '.'));
}
