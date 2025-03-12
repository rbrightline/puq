import path from 'path';
import { fileURLToPath } from 'url';

export function filesOf(generatorName: string) {
  const filename = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(filename), generatorName, 'files');
}
