import { normalize } from 'path';

/**
 * Split path into segments
 * @param filepath filepath
 * @returns segment string array
 */
export function segments(filepath: string): string[] {
  return normalize(filepath).split('\\');
}
