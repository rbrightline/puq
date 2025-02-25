import { debug, end, start } from '@puq/debug';
import { InvalidValueError } from '@puq/error';
import { rval } from '@puq/is';

/**
 * Extract the filename/last segment from the filepath.
 * @param filepath filename
 * @returns
 */
export function filename(filepath: string): string {
  start(filename.name);

  filepath = rval(filepath);

  debug({ filepath });

  const __filename = filepath.split('\\').pop();

  debug({ extractedFileName: __filename });

  if (__filename) {
    end();
    return __filename;
  }
  throw new InvalidValueError(`${filepath} is not valid`);
}
