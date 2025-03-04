import { normalize } from 'path';

/**
 * Split path into segments
 * @param filepath - {@link string}
 * @returns - {@link  Array<string>}
 */
export function segments(filepath: string): Array<string> {
  return normalize(filepath).split('\\');
}
