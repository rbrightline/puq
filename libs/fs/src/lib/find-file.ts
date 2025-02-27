import { files } from './files.js';
import { FileNotFoundError, InvalidValueError } from '@puq/error';
import { segments } from './segments.js';
import { resolve } from 'path';

export type FindFileOptions = {
  recursive?: boolean;
  fullpath?: boolean;
};

/**
 * Find file and return the absolute filepath recursively (optional)
 * @param filepath file path or file path with filename expression
 * @param options
 * @returns
 * @throw
 */
export async function findFile(
  filepath: string,
  options?: FindFileOptions
): Promise<string | never> {
  filepath = resolve(filepath);

  const rotopath = resolve(filepath, '..');

  const __segments = segments(filepath);

  const filename = __segments.at(-1);

  const foundFiles = await files(rotopath, { ...options, fullpath: true });

  const rx = new RegExp(`${filename}`);

  if (filename == undefined)
    throw new InvalidValueError(
      `Could not extract the last segment from the ${filepath}`
    );

  if (foundFiles.length == 0)
    throw new FileNotFoundError(`File not found: ${filepath}`);

  for (const filepath of foundFiles) {
    const __segments = segments(filepath);
    const relativeRoot = __segments.slice(0, -1).join('\\');
    const filename = __segments.at(-1);

    if (!filename || !relativeRoot || !rx.test(filename)) continue;

    return filepath;
  }

  throw new FileNotFoundError(`File not found: ${filepath}`);
}
