import { dirs } from './dirs.js';
import { files } from './files.js';
import { scope } from './scope.js';
import { dirpath } from './dirpath.js';
import { filename } from './filename.js';
import { FileNotFoundError } from '@puq/error';
import { debug, start, end } from '@puq/debug';

export type FindFileOptions = {
  recursive?: boolean;
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
  const timeout = setTimeout(() => {
    throw new Error('findFile operation takes too long ');
  }, 5000);

  start('findFile');
  debug({ filepath });
  debug(options);

  const resolve = scope();

  filepath = resolve(filepath);

  debug({ filepath });

  const directory = dirpath(filepath);

  debug({ directory });

  const fname = filename(filepath);

  debug({ filename: fname });

  const foundFiles = await files(directory);

  debug({ foundFiles });

  const ex = new RegExp(fname);

  debug({ regularExpression: ex });

  const found = foundFiles.find((e) => ex.test(e));

  debug({ found });

  if (found) {
    end();
    clearTimeout(timeout);
    return resolve(directory, found);
  }

  if (options?.recursive === true) {
    const foundDirs = await dirs(directory);

    debug({ foundDirs });
    if (foundDirs.length > 0) {
      for (const d of foundDirs) {
        try {
          const found = await findFile(resolve(directory, d, fname), options);
          end();
          clearTimeout(timeout);
          return found;
        } catch (err) {
          if (!(err instanceof FileNotFoundError)) {
            clearTimeout(timeout);
            throw err;
          }
          end();
        }
      }
    }
  }

  clearTimeout(timeout);

  throw new FileNotFoundError(`File not found by ${filepath}`);
}
