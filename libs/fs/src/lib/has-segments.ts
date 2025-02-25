import { rval } from '@puq/is';
import { normalize } from 'path';
import { debug, end, start } from '@puq/debug';
/**
 * Check the filepath has more than one segment
 * @param filepath
 * @returns
 */
export function hasSegments(filepath: string): boolean {
  start('hasSegments');
  debug({ filepath });
  const result = normalize(rval(filepath)).includes('\\');
  debug({ result });
  end();
  return result;
}
