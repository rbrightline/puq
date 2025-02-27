import { readFile } from 'fs/promises';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { load } from 'js-yaml';

/**
 * Read file and parse YAML
 * @param filepath file path
 * @returns object {@link T}
 */
export async function readYAMLFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath);
  const text = buffer.toString();
  const object = await load(text);
  return object as T;
}
