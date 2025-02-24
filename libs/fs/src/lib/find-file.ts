import { join } from 'path';
import { dirs } from './dirs.js';
import { files } from './files.js';

/**
 * Seach directory by filename recursively and return the filepath
 * @param directory root directory
 * @param expression filename expression (RexExp) string
 */
export async function findFile(
  directory: string,
  expression: string
): Promise<string | never> {
  const foundFiles = await files(directory);
  const RX = new RegExp(expression);
  const found = foundFiles.find((e) => RX.test(e));

  if (found) return join(directory, found);

  const foundDirs = await dirs(directory);

  if (foundDirs.length > 0)
    for (const d of foundDirs) {
      const result = await findFile(join(directory, d), expression);
      if (result) return result;
    }

  throw new Error(
    `Could not find any file mathcing the expression ${expression} under the dirctcory ${directory}`
  );
}
