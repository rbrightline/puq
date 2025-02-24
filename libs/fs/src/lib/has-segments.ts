import { rval } from '@puq/is';
import { normalize } from 'path';

/**
 * Check the filepath has more than one segment
 * @param filepath
 * @returns
 */
export function hasSegments(filepath: string): boolean {
  return normalize(rval(filepath)).includes('\\');
}
