import { files } from './files.js';
import {
  ErrorCode,
  throwFileNotFoundError,
  throwInvalidFieldError,
} from '@puq/error';
import { segments } from './segments.js';
import { resolve } from 'path';
import { IOptions } from './io-options.js';

/**
 * Find the first matching file with the {@link filepath}. The filename in the {@link filepath} might be {@link RegExp} string such as `\.ts`
 * @param filepath filepath to search under the directory
 * @param options {@link IOptions}
 * @returns file path
 * @throw {@link ErrorCode.FileNotFound} if the file not found
 */
export async function findFile(
  filepath: string,
  options?: IOptions
): Promise<string | never> {
  filepath = resolve(filepath);

  const rotopath = resolve(filepath, '..');

  const __segments = segments(filepath);

  const filename = __segments.at(-1);

  const foundFiles = await files(rotopath, { ...options, fullpath: true });

  const rx = new RegExp(`${filename}`);

  if (filename == undefined)
    throwInvalidFieldError(
      `Could not extract the last segment from the ${filepath}`
    );

  if (foundFiles.length == 0)
    throwFileNotFoundError(`File not found: ${filepath}`);

  for (const filepath of foundFiles) {
    const __segments = segments(filepath);
    const relativeRoot = __segments.slice(0, -1).join('\\');
    const filename = __segments.at(-1);

    if (!filename || !relativeRoot || !rx.test(filename)) continue;

    return filepath;
  }

  throwFileNotFoundError(`File not found: ${filepath}`);
}
