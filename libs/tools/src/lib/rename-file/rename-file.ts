import { files } from '@puq/fs';
import { rename } from 'fs/promises';
import { join } from 'path';

import { debug } from '@puq/debug';
export type RenameOptions = {
  /**
   * The root directory of the file
   */
  directory?: string;

  /**
   * Regular expression string that matches the file names
   */
  expression: string;

  /**
   * New file name or replacement string
   */
  to: string;

  /**
   * placeholder string (optional)
   */
  from?: string;

  /**
   * filename suffix
   */
  suffix?: string;

  /**
   * filename prefix
   */
  prefix?: string;
};

/**
 * Rename file
 * @param options {@link RenameOptions}
 * @returns
 */
export async function renameFile(options: RenameOptions): Promise<void> {
  const RX = new RegExp(options.expression);
  const directory = options.directory ?? '.';
  const foundFiles = await files(directory);
  const prefix = options.prefix ?? '';
  const suffix = options.suffix ?? '';

  debug({ ...options });
  debug({ suffix, prefix, directory });
  debug({ foundFiles });

  if (foundFiles.length == 0)
    throw new Error(`No files found in the directory ${directory}`);

  const operations = foundFiles
    .map(async (filename) => {
      if (!RX.test(filename)) {
        debug(`${filename} does not pass the expression test`);
        return undefined;
      }
      let newFileName = options.to;
      debug({ newFileName });
      if (options.from) {
        newFileName = filename.replace(options.from, options.to);
        debug({ newFileName });
      }

      const source = join(directory, filename);
      const target = join(directory, [prefix, newFileName, suffix].join(''));
      debug({ source, target });
      await rename(source, target);
    })
    .map((e) => e);

  await Promise.all(operations);
  return;
}
