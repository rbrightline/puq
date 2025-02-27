import { stat } from 'fs/promises';

/**
 * Checkt he filepath is a directory
 * @param filepath
 * @returns if the {@link filepath} is a directory, then return true, else false
 */
export async function isDir(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isDirectory();
}
