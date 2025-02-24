import { debug, end, start } from '@puq/debug';
import { InvalidValueError } from '@puq/error';
import { rval } from '@puq/is';
import { normalize } from 'path';

/**
 * Extract the filename from the filepath
 * @param filepath filename
 * @returns
 */
export function filename(filepath: string): string {
  start('filename');
  debug({ filepath });
  const extractedFileName = normalize(rval(filepath)).split('\\').pop();

  debug({ extractedFileName });

  if (extractedFileName) {
    end();
    return extractedFileName;
  }
  throw new InvalidValueError(`${filepath} is not valid`);
}
