import { normalize } from 'path';
import { rval } from '@puq/is';

/**
 * Extract the filename from the url
 * @param directory
 * @returns
 */
export function getName(directory: string): string {
  return rval(normalize(directory).split('\\').pop());
}
