import { stat } from 'fs/promises';

/**
 * Checkt he filepath is a directory
 * @param filepath
 * @returns
 */
export async function isDir(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isDirectory();
}
