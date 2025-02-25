import { writeFile as __writeFile } from 'fs/promises';
import { scope } from './scope.js';
import { normalize } from 'path';
import { rval } from '@puq/is';
import internal from 'stream';
import { Mode, ObjectEncodingOptions, OpenMode } from 'fs';
import { Abortable } from 'events';
import { dirpath } from './dirpath.js';
import { mkdir } from './mkdir.js';

export type FileContent =
  | string
  | NodeJS.ArrayBufferView
  | Iterable<string | NodeJS.ArrayBufferView>
  | AsyncIterable<string | NodeJS.ArrayBufferView>
  | internal.Stream;

export type WriteFileOptions =
  | (ObjectEncodingOptions & {
      mode?: Mode | undefined;
      flag?: OpenMode | undefined;
    } & Abortable)
  | BufferEncoding
  | null;

/**
 * Write file. If the directory does not exist, create the directory.
 * @param filepath
 * @param content
 * @param options
 * @returns
 */
export async function writeFile(
  filepath: string,
  content: FileContent,
  options?: WriteFileOptions
): Promise<string> {
  const resolve = scope();
  filepath = rval(filepath);
  filepath = resolve(normalize(filepath));

  await mkdir(dirpath(filepath));

  await __writeFile(filepath, content, options);
  return filepath;
}
