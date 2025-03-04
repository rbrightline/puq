import { readFile } from 'fs/promises';
import { load } from 'js-yaml';

/**
 * Asynchronously reads and parses a YAML file, returning its contents as a typed object.
 *
 * @typeParam T - The expected type of the parsed YAML content
 * @param filepath - The path to the YAML file. Can be absolute or relative.
 * @returns A promise that resolves to the parsed YAML content typed as T
 * @throws - {@link Error} via {@link readFile} - If the file cannot be read (e.g., not found, permission denied)
 * @throws - {@link Error} via {@link load} - If the file content is not valid YAML
 *
 * @example
 * // Read a YAML file with inferred type
 * interface Config { name: string; version: number }
 * const config = await readYAMLFile<Config>('/path/to/config.yaml');
 * // Returns: { name: "app", version: 1 } typed as Config
 */
export async function readYAMLFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath);
  const text = buffer.toString();
  const object = await load(text);
  return object as T;
}
