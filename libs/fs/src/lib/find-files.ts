import { normalize, resolve } from 'path';
import { files } from './files.js';
import { InvalidValueError, FileNotFoundError } from '@puq/error';
import { segments } from './segments.js';
import { IOptions } from './io-options.js';

/**
 * Find all files matching with the {@link filepath}.
 * @param filepath file path. Filename part might be regular expression such as `\.ts`
 * @param options  {@link @FindFilesOptions}
 * @throw {@link FileNotFoundError} if file not found
 */
export async function findFiles(
  filepath: string,
  options?: IOptions
): Promise<string[]> {
  filepath = resolve(filepath);
  const __segments = segments(filepath);

  const rootpath = resolve(filepath, '..');

  const filename = __segments.at(-1);

  const foundFiles = await files(rootpath, { ...options, fullpath: true });

  const rx = new RegExp(`${filename}`);

  if (filename == undefined)
    throw new InvalidValueError(
      `Could not extract the last segment from the ${filepath}`
    );

  if (foundFiles.length == 0)
    throw new FileNotFoundError(`File not found: ${filepath}`);

  const result: string[] = [];

  for (const filepath of foundFiles) {
    const __segments = segments(filepath);

    const relativeRoot = __segments.slice(0, -1).join('\\');

    const filename = __segments.at(-1);

    if (!filename || !relativeRoot || !rx.test(filename)) continue;

    result.push(filepath);
  }

  if (result.length == 0)
    throw new FileNotFoundError(`File not found: ${filepath}`);

  if (options?.fullpath) return result;

  return result.map((e) => normalize(e.replace(rootpath, './')));
}
