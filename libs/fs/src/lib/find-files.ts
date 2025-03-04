import { normalize, resolve } from 'path';
import { files } from './files.js';
import { throwFileNotFoundError } from '@puq/error';
import { segments } from './segments.js';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * Asynchronously finds all files matching a given filepath pattern.
 * The filename portion can include RegExp-style patterns (e.g., '\.ts$').
 *
 * @param filepath - The file path or pattern to search for. Can be absolute or relative.
 * @param options - Optional configuration for file searching, extends CommonFileOptions
 * @returns A promise that resolves to an array of matching file paths
 * @throws - {@link Error} via {@link throwFileNotFoundError} - If the filepath cannot be segmented
 * @throws - {@link Error} via {@link throwFileNotFoundError} - If no matching files are found
 *
 * @example
 * // Find all TypeScript files in a directory
 * const tsFiles = await findFiles('/path/to/.*\.ts$');
 * // Returns: ['/path/to/file1.ts', '/path/to/file2.ts']
 *
 * @example
 * // Find files recursively with relative paths
 * const filesList = await findFiles('./src/.*\.js$', { recursive: true, absolutePath: false });
 * // Returns: ['./src/file1.js', './src/subdir/file2.js']
 */
export async function findFiles(
  filepath: string,
  options?: CommonFileOptions,
): Promise<string[]> {
  filepath = resolve(filepath);
  const __segments = segments(filepath);

  const rootpath = resolve(filepath, '..');

  const filename = __segments.at(-1);

  const foundFiles = await files(rootpath, { ...options, absolutePath: true });

  const regularExpression = new RegExp(`${filename}`);

  if (filename == undefined)
    throwFileNotFoundError(
      `Could not extract the last segment from the ${filepath}`,
    );

  if (foundFiles.length == 0)
    throwFileNotFoundError(`File not found: ${filepath}`);

  const result: string[] = [];

  for (const filepath1 of foundFiles) {
    const __segments1 = segments(filepath1);

    const relativeRoot = __segments1.slice(0, -1).join('\\');

    const filename1 = __segments1.at(-1);

    if (!filename1 || !relativeRoot || !regularExpression.test(filename1))
      continue;

    result.push(filepath1);
  }

  if (result.length == 0) throwFileNotFoundError(`File not found: ${filepath}`);

  if (options?.absolutePath) return result;

  return result.map((e) => normalize(e.replace(rootpath, './')));
}
