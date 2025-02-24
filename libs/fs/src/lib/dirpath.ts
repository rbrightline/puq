import { rval } from '@puq/is';
import { normalize } from 'path';

/**
 * Extract the dirpath from the filepath
 * @param filepath filename
 * @returns
 */
export function dirpath(filepath: string) {
  return normalize(rval(filepath)).split('\\').slice(0, -1).join('\\');
}
