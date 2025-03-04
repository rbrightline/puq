import { normalize } from 'path';

/**
 * Splits a file path into an array of path segments.
 * Normalizes the path before splitting to ensure consistent separators and formatting.
 *
 * @param filepath - The file path to split into segments. Can be absolute or relative.
 * @returns - {@link Array<string>} An array of path segments
 *
 * @example
 * // Split a normalized path
 * const result = segments('/path/to\\file.txt');
 * // Returns: ['/', 'path', 'to', 'file.txt']
 *
 * @example
 * // Split a relative path with mixed separators
 * const result = segments('dir1\\dir2/file');
 * // Returns: ['dir1', 'dir2', 'file']
 */
export function segments(filepath: string): Array<string> {
  return normalize(filepath).split('\\');
}
