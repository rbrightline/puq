import { readdir, stat } from 'fs/promises';

/**
 * Find all directories in the target directory (only directories)
 * @param directory target directory ("." by default)
 * @returns
 */
export async function dirs(directory = '.'): Promise<string[]> {
  const found = await readdir(directory);
  const foundDirs = found.filter(async (d) => (await stat(d)).isDirectory());
  return await Promise.all(foundDirs);
}
