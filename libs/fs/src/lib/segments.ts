import { normalize } from 'path';

/**
 * List all segments of filepath such as ['root', 'sub1', 'sub2', 'sub3', 'file.ts']
 * @param filepath filepath
 * @returns list of all segments
 */
export function segments(filepath: string): string[] {
  return normalize(filepath).split('\\');
}
