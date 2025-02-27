import { readFile } from 'fs/promises';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { load } from 'js-yaml';

/**
 * Read and parse `yaml` file
 * @param filepath file path
 * @returns object {@link T}
 */
export async function readYAMLFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath);
  const text = buffer.toString();
  const object = await load(text);
  return object as T;
}
