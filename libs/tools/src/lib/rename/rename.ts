import { dirs, files, scope } from '@puq/fs';
import { rename as __rename } from 'fs/promises';
import { join } from 'path';
import { debug } from '@puq/debug';
import { cwd } from 'process';
import type { RenameOptions } from './rename-options.js';

/**
 * Recursively(optional) rename files matched by the {@link expression} property in {@link RenameOptions}.
 * @param options {@link RenameOptions}
 * @returns - {@link Promise<void>}
 */
export async function rename(options: RenameOptions): Promise<void> {
  const resolve = scope(cwd());
  const regularExpression = new RegExp(options.expression);
  const directory = resolve(options.directory ?? '.');
  const prefix = options.prefix ?? '';
  const suffix = options.suffix ?? '';

  // Check prefix and suffix have escaping out of scope
  resolve(prefix);
  resolve(suffix);

  debug({ ...options, regularExpression });

  debug({ suffix, prefix, directory });

  const foundFiles = await files(directory);

  debug({ foundFiles });

  {
    if (options.recursive == true) {
      const foundDirs = await dirs(directory);
      if (foundDirs.length > 0) {
        await Promise.all(
          foundDirs.map(
            async (d) =>
              await rename({ ...options, directory: join(directory, d) }),
          ),
        );
      }
    }
  }

  if (foundFiles.length == 0) {
    debug(
      `There is no matching files with ${regularExpression} in the directory ${directory}`,
    );
    return;
  }

  const matchedFiles = foundFiles.filter((e) => regularExpression.test(e));

  const operations = matchedFiles.map(async (filename) => {
    let newFilename = options.to[0];

    debug({ newFilename });

    if (options.from) {
      options.from.forEach((f, i) => {
        newFilename = filename.replace(f, options.to[i] ?? options.to[0]);
        debug({ filename, newFilename });
      });
    }

    const source = join(directory, filename);
    const target = join(directory, [prefix, newFilename, suffix].join(''));

    debug({ source, target });

    await __rename(source, target);

    if (options.recursive == true) {
      const foundDirs = await dirs(directory);

      await Promise.all(
        foundDirs.map((childDirectory) => {
          return rename({ ...options, directory: childDirectory });
        }),
      );
    }
  });

  await Promise.all(operations);
}
