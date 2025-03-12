import type { ReplaceOptions } from './replace-options.js';
import { dirs, files } from '@puq/fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function replace(options: ReplaceOptions) {
  const { expression, from, to, prefix, suffix } = options;
  const RX = new RegExp(expression ?? '');
  const directory = options.directory ?? '';

  const foundFiles = await files(directory);

  const matchedFiles = foundFiles.filter((filename) => RX.test(filename));

  if (matchedFiles.length == 0)
    throw new Error(`No files found in the directory ${directory}`);

  const filenameContentPromise = matchedFiles.map(async (filename) => [
    filename,
    (await readFile(join(directory, filename))).toString(),
  ]);

  const filenameContent = await Promise.all(filenameContentPromise);

  const replaceContentForEachFile = filenameContent.map(
    async ([filename, content]) => {
      from.forEach((f, i) => {
        const replacement = (prefix ?? '') + (to[i] ?? to[0]) + (suffix ?? '');
        content = content.replace(new RegExp(f, 'g'), replacement);
      });

      await writeFile(join(directory, filename), content);
    },
  );

  for (const __replaceContentForEachFile of replaceContentForEachFile) {
    await __replaceContentForEachFile;
  }

  const foundDirs = await dirs(directory);

  if (foundDirs.length > 0) {
    const replaceAllSubDirectories = foundDirs.map((subDirectory) =>
      replace({ ...options, directory: join(directory, subDirectory) }),
    );

    for (const __replaceAllSubDirectories of replaceAllSubDirectories) {
      await __replaceAllSubDirectories;
    }
  }
}
