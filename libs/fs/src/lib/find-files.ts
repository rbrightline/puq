import { normalize, resolve } from 'path';
import { files } from './files.js';
import { throwFileNotFoundError } from '@puq/error';
import { segments } from './segments.js';
import type { CommonFileOptions } from './common-file-options.js';

/**
 * Find all files matching with the {@link filepath}.
 * @param filepath file path. Filename part might be regular expression such as `\.ts`
 * @param options  {@link @FindFilesOptions}
 * @throw {@link FileNotFoundError} if file not found
 */
export async function findFiles(
  filepath: string,
  options?: CommonFileOptions,
): Promise<string[]> {
  filepath = resolve(filepath);
  const __segments = segments(filepath);

  const rootpath = resolve(filepath, '..');

  const filename = __segments.at(-1);

  const foundFiles = await files(rootpath, { ...options, fullpath: true });

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

  if (options?.fullpath) return result;

  return result.map((e) => normalize(e.replace(rootpath, './')));
}
