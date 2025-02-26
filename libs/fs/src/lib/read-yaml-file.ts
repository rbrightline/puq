import { readFile } from './read-file.js';
import { load } from 'js-yaml';

/**
 * Read yaml file
 * @param filepath file path
 * @returns {T}
 */
export async function readYamlFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath, { recursive: true });
  const text = buffer.toString();

  return load(text) as T;
}
