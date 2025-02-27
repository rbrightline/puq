import { stat } from 'fs/promises';

/**
 * Check the path is file
 * @param filepath
 * @returns
 */
export async function isFile(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isFile();
}
