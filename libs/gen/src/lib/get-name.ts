import { normalize } from 'path';

/**
 * Get the name from the provide name parameter which might be a path with multiple segments
 * @param name parameter provided by the generator
 * @returns
 */
export function getName(name: string): string {
  const n = normalize(name);
  const result = n.split('\\').pop();
  if (!result) throw new Error(`could not get the name from ${name}`);

  return result;
}
