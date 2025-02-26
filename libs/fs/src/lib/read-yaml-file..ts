import { readFile } from './read-file.js';

/**
 * Read json file
 * @param filepath file path
 * @returns {T}
 */
export async function readJSONFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath, { recursive: true });
  const text = buffer.toString();
  return JSON.parse(text) as T;
}
