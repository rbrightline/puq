import { rval } from '@puq/is';
import { stat } from 'fs/promises';
import { normalize } from 'path';
import { scope } from './scope.js';

export async function isDir(filepath: string): Promise<boolean> {
  filepath = scope()(filepath);
  const __stat = await stat(normalize(rval(filepath)));
  return __stat.isDirectory();
}
