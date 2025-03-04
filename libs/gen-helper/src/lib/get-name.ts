import { normalize } from 'path';
import { isDefinedOrThrow } from '@puq/is';

/**
 * Extract the filename from the url
 * @param directory
 * @returns
 */
export function getName(directory: string): string {
  return isDefinedOrThrow(normalize(directory).split('\\').pop());
}
