import { readFile } from 'fs/promises';

/**
 * Asynchronously reads and parses a JSON file, returning its contents as a typed object.
 *
 * @typeParam T - The expected type of the parsed JSON content
 * @param filepath - The path to the JSON file. Can be absolute or relative.
 * @returns A promise that resolves to the parsed JSON content typed as T
 * @throws - {@link Error} via {@link readFile} - If the file cannot be read (e.g., not found, permission denied)
 * @throws - {@link Error} via {@link JSON.parse} - If the file content is not valid JSON
 *
 * @example
 * // Read a JSON file with inferred type
 * interface Config { name: string; version: number }
 * const config = await readJSONFile<Config>('/path/to/config.json');
 * // Returns: { name: "app", version: 1 } typed as Config
 */
export async function readJSONFile<T>(filepath: string): Promise<T> {
  const buffer = await readFile(filepath);
  const text = buffer.toString();
  return JSON.parse(text) as T;
}
