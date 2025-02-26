import { normalize } from 'path';

/**
 * Extract the filename from the url
 * @param directory
 * @returns
 */
export function getName(directory: string): string {
  return normalize(directory).split('\\').pop()!;
}
