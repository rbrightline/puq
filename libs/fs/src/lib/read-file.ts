import { start } from 'repl';
import { findFile } from './find-file.js';
import { scope } from './scope.js';
import { FileNotFoundError } from '@puq/error';
import { readFile as __readFile } from 'fs/promises';
import { debug, end } from '@puq/debug';
export type ReadFileOptions = {
  recursive?: boolean;
};

/**
 * Find and read the file that mathces the expression.
 * @param filepath file path or file expression or file path with file-name expression.
 * For example `directory/some/other/file*` , `file.ts`, file.*`
 * @returns
 */
export async function readFile(filepath: string, options?: ReadFileOptions) {
  start('readFile');

  debug({ filepath, options });

  const resolve = scope();

  filepath = resolve(filepath);

  debug({ filepath });

  const found = await findFile(filepath, options);

  debug({ found });

  if (!found) throw new FileNotFoundError();

  const fileContent = await __readFile(found);

  debug({ fileContent });

  end();

  return fileContent;
}
