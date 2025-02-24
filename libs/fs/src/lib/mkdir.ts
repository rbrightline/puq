import { debug } from '@puq/debug';
import { mkdir as __mkdir } from 'fs/promises';
import { normalize } from 'path';
/**
 * Create directory recursively
 * @param directory directory path such as `./first/second/third/fourth/fifth...'
 * @deprecated use the nodejs's mkdir, it already supports recursive operation
 */
export async function mkdir(directory: string): Promise<void | never> {
  debug(`Start-----------------------mkdir(${directory})`);
  const normalized = normalize(directory);

  debug({ directory });
  const segments = normalized.split('\\');
  debug({ segments });
  const lengh = segments.length;

  debug({ segmentsLength: lengh });
  for (let i = 0; i <= lengh; i++) {
    const p = segments.slice(0, i).join('\\');
    if (!p) continue;

    debug({ forEachDir: p });

    try {
      await __mkdir(p, { recursive: true });
    } catch (err) {
      debug(err);
    }
  }

  debug(`End-----------------------mkdir(${directory})`);
}
