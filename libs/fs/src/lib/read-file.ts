import { normalize } from 'path';
import { findFile } from './find-file.js';
import { readFile as __readFile } from 'fs/promises';

/**
 * Find and read the file file that mathces the expression.
 * @param expression file path or file expression or file path with file-name expression.
 * For example `directory/some/other/file*` , `file.ts`, file.*`
 * @returns
 */
export async function readFile(expression: string) {
  const normalized = normalize(expression);
  const segments = normalized.split('\\');

  if (segments.length > 1) {
    const directory = segments.slice(0, -1).join('\\') ?? './';
    const fileExpression = segments.slice(-1).pop();

    if (!fileExpression) throw new Error(`Invalid expression ${expression}`);

    const foundFilePath = await findFile(directory, fileExpression);
    return await __readFile(foundFilePath);
  } else {
    const foundFilePath = await findFile('.', expression);
    return await __readFile(foundFilePath);
  }
}
