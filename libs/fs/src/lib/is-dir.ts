import { stat } from 'fs/promises';

/**
 * Asynchronously checks if the provided filepath points to a directory.
 *
 * @param filepath - The path to check. Can be absolute or relative.
 * @returns A promise that resolves to true if the path is a directory, false otherwise
 * @throws - {@link Error} via {@link stat} - If the filepath cannot be accessed or stats cannot be retrieved
 *
 * @example
 * // Check if a path is a directory
 * const isDirectory = await isDir('/path/to/check');
 * // Returns: true if directory, false if file or nonexistent
 */
export async function isDir(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isDirectory();
}
