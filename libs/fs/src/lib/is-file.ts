import { stat } from 'fs/promises';
import { scope } from './scope.js';

export async function isFile(filepath: string): Promise<boolean> {
  filepath = scope()(filepath);
  const __stat = await stat(filepath);
  return __stat.isFile();
}
