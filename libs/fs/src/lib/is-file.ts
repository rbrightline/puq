import { stat } from 'fs/promises';

/**
 * Check the path is file
 * @param filepath
 * @returns if the {@link filepath} is a file, then return `true`, else `false`
 */
export async function isFile(filepath: string): Promise<boolean> {
  return (await stat(filepath)).isFile();
}
