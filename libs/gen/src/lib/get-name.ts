import { normalize } from 'path';

export function getName(directory?: string): string {
  if (!directory) throw new Error('Directory is required');
  return normalize(directory).split('\\').pop()!;
}
