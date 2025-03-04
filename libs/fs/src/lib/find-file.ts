import { files } from './files.js';
import { throwFileNotFoundError, throwInvalidFieldError } from '@puq/error';
import { segments } from './segments.js';
import { resolve } from 'path';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * Find the first matching file with the {@link filepath}. The filename in the {@link filepath} might be {@link RegExp} string such as `\.ts`
 * @param filepath filepath to search under the directory
 * @param options {@link CommonFileOptions}
 * @returns - {@link Promise<string>}
 * @throws {@link throwInvalidFieldError } or {@link | throwFileNotFoundError}
 */
export async function findFile(
  filepath: string,
  options?: CommonFileOptions,
): Promise<string> {
  filepath = resolve(filepath);

  const rootpath = resolve(filepath, '..');

  const segments0 = segments(filepath);

  const filename = segments0.at(-1);

  const foundFiles = await files(rootpath, { ...options, fullpath: true });

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
