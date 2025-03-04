import { files } from './files.js';
import { throwFileNotFoundError, throwInvalidFieldError } from '@puq/error';
import { segments } from './segments.js';
import { resolve } from 'path';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * Asynchronously finds the first file matching a given filepath pattern.
 * The filename portion can include RegExp-style patterns (e.g., '\.ts$').
 *
 * @param filepath - The file path or pattern to search for. Can be absolute or relative.
 * @param options - Optional configuration for file searching, extends CommonFileOptions
 * @returns A promise that resolves to the absolute path of the first matching file
 * @throws - {@link Error} via {@link throwInvalidFieldError} - If the filepath cannot be segmented
 * @throws - {@link Error} via {@link throwFileNotFoundError} - If no matching file is found
 *
 * @example
 * // Find a specific file
 * const file = await findFile('/path/to/file.txt');
 * // Returns: '/path/to/file.txt' if found
 *
 * @example
 * // Find first TypeScript file using regex pattern
 * const tsFile = await findFile('/path/to/.*\.ts$', { recursive: true });
 * // Returns: '/path/to/example.ts' if found
 */
export async function findFile(
  filepath: string,
  options?: CommonFileOptions,
): Promise<string> {
  filepath = resolve(filepath);

  const rootpath = resolve(filepath, '..');

  const segments0 = segments(filepath);

  const filename = segments0.at(-1);

  const foundFiles = await files(rootpath, { ...options, absolutePath: true });

  const regularExpression = new RegExp(`${filename}`);

  if (filename == undefined)
    throwInvalidFieldError(
      `Could not extract the last segment from the ${filepath}`,
    );

  if (foundFiles.length == 0)
    throwFileNotFoundError(`File not found: ${filepath}`);

  for (const filepath1 of foundFiles) {
    const segments1 = segments(filepath1);
    const relativeRoot = segments1.slice(0, -1).join('\\');
    const filename1 = segments1.at(-1);

    if (!filename1 || !relativeRoot || !regularExpression.test(filename1))
      continue;

    return filepath1;
  }

  throwFileNotFoundError(`File not found: ${filepath}`);
}
