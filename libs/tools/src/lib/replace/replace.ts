import { debug } from '@puq/debug';
import { dirs, files } from '@puq/fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export type ReplaceOptions = {
  /**
   * The root directory of the file
   */
  directory?: string;

  /**
   * Regular expression string that matches the file names
   */
  expression: string;

  /**
   * placeholder regular expression string (optional)
   */
  from: string[];

  /**
   * replacement string
   */
  to: string[];

  prefix?: string;

  suffix?: string;
};

export async function repalce(options: ReplaceOptions) {
  const { expression, from, to, prefix, suffix } = options;
  const RX = new RegExp(expression);
  const directory = options.directory ?? '';

  debug(options);

  const foundFiles = await files(directory);
  debug({ foundFiles });

  const matchedFiles = foundFiles.filter((filename) => RX.test(filename));
  debug({ matchedFiles });

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
    }
  );

  for (const e of replaceContentForEachFile) {
    await e;
  }

  const foundDirs = await dirs(directory);

  if (foundDirs.length > 0) {
    const replaceAllSubDirectories = foundDirs.map((subDirectory) =>
      repalce({ ...options, directory: join(directory, subDirectory) })
    );

    for (const e of replaceAllSubDirectories) {
      await e;
    }
  }
}
