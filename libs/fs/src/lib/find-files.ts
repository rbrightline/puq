import { join } from 'path';
import { filename } from './filename.js';
import { dirpath } from './dirpath.js';
import { files } from './files.js';
import { dirs } from './dirs.js';
import { scope } from './scope.js';
import { debug, end, start } from '@puq/debug';

export type FindFilesOptions = {
  recursive?: boolean;
};

/**
 * Find files and return the list of relative paths
 * @param filepath string | regular expression
 * @param options  {@link @FindFilesOptions}
 */
export async function findFiles(
  filepath: string,
  options?: FindFilesOptions
): Promise<string[]> {
  start('findFiles');
  debug({ filepath });
  debug(options);

  filepath = scope()(filepath);

  const result: string[] = [];

  const fname = filename(filepath);
  const nameExp = new RegExp(fname);
  const dir = dirpath(filepath);
  const filesUnderDir = await files(dir);
  const filteredFileNames = filesUnderDir.filter((e) => nameExp.test(e));
  result.push(...filteredFileNames);

  if (options?.recursive === true) {
    const dirsUnderDir = await dirs(dir);

    const foundSubFiles = await Promise.all(
      dirsUnderDir.map((e) => findFiles(join(dir, e, fname), options))
    );

    foundSubFiles.forEach((e) => result.push(...e));
  }

  end();
  return result;
}
