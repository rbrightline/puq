import { dirs, files } from '@puq/fs';
import { rename as __rename } from 'fs/promises';
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
  to: string[];

  /**
   * placeholder string (optional)
   */
  from?: string[];

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
export async function rename(options: RenameOptions): Promise<void> {
  const RX = new RegExp(options.expression);
  const directory = options.directory ?? '.';
  const prefix = options.prefix ?? '';
  const suffix = options.suffix ?? '';

  debug({ ...options });
  debug({ suffix, prefix, directory });

  const matchedFiles = await files(directory);

  debug({ matchedFiles });

  if (matchedFiles.length == 0)
    throw new Error(`No files found in the directory ${directory}`);

  const operations = matchedFiles
    .map(async (filename) => {
      if (!RX.test(filename)) {
        debug(`${filename} does not pass the expression test`);
        return undefined;
      }

      let newFileName = options.to[0];

      debug({ newFileName });

      if (options.from) {
        options.from.forEach((f, i) => {
          newFileName = filename.replace(f, options.to[i] ?? options.to[0]);
        });
        debug({ newFileName });
      }

      const source = join(directory, filename);
      const target = join(directory, [prefix, newFileName, suffix].join(''));
      debug({ source, target });
      await __rename(source, target);
    })
    .map((e) => e);

  await Promise.all(operations);

  const foundDirs = await dirs(directory);

  if (foundDirs.length > 0) {
    await Promise.all(
      foundDirs.map((d) =>
        rename({ ...options, directory: join(directory, d) })
      )
    );
  }
}
