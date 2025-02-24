import { debug } from '@puq/debug';
import { mkdir as __mkdir } from 'fs/promises';
import { normalize } from 'path';
/**
 * Create directory recursively
 * @param directory directory path such as `./first/second/third/fourth/fifth...'
 */
export async function mkdir(directory: string): Promise<void | never> {
  const normalized = normalize(directory);

  const segments = normalized.split('\\');
  const lengh = segments.length;

  for (let i = 0; i <= lengh; i++) {
    const p = segments.slice(0, i).join('\\');
    if (!p) continue;

    try {
      await __mkdir(p);
    } catch (err) {
      debug(err);
    }
  }
}
