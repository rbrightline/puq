import { findFile } from './find-file.js';
import { scope } from './scope.js';
import { dirpath } from './dirpath.js';
import { filename } from './filename.js';

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
  filepath = scope()(filepath);

  const found = await findFile(dirpath(filepath), filename(filepath));
  if (!found) throw ;
}
