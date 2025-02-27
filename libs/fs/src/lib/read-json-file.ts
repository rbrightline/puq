import { readFile } from 'fs/promises';

/**
 * Read file and parse json
 * @param filepath filepath
 * @returns object {@link T}
 */
export async function readJSONFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath);
  const text = buffer.toString();
  return JSON.parse(text) as T;
}
