import { stat } from 'fs/promises';

/**
 * Asynchronously checks if the provided filepath points to a file.
 *
 * @param filepath - The path to check. Can be absolute or relative.
 * @returns A promise that resolves to true if the path is a directory, false otherwise
 * @throws - {@link Error} via {@link stat} - If the filepath cannot be accessed or stats cannot be retrieved
 *
 * @example
 * // Check if a path is a file path
 * const isFilePath = await isFile('/path/to/check/file.ts');
 * // Returns: true if directory, false if file or nonexistent
 */
export async function isFile(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isFile();
}
