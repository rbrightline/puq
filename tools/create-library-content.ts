#!/usr/bin/env ts-node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function run() {
  const ROOT = join(__dirname, '..', 'libs');
  const libs = await readdir(ROOT);

  const files = libs.map(async (e) => {
    const root = join(ROOT, e);
    const packageJsonPath = join(root, 'package.json');
    const content = (await readFile(packageJsonPath)).toString();
    return JSON.parse(content);
  });

  const result = await Promise.all(files);

  const newFile = result;

  const TARGET_ROOT = join(__dirname, '..', 'content');
  const CONTENT_JSON_FILE_PATH = join(TARGET_ROOT, 'libs.json');
  await writeFile(CONTENT_JSON_FILE_PATH, JSON.stringify(newFile));
}

run();
