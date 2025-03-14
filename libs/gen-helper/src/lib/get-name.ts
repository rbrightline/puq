import { isDefinedOrThrow } from '@puq/is';
import { segments } from '@puq/fs';

/**
 * Extract the filename from the url
 * @param directory
 * @returns
 */
export function getName(directory: string): string {
  return isDefinedOrThrow(segments(directory).pop());
}
