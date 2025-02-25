#!/usr/bin/env ts-node

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const LIBS_ROOT = join(__dirname, '..', 'libs');
const libs = readdirSync(LIBS_ROOT);

const result: string[] = [];

for (const l of libs) {
  const content = readFileSync(join(LIBS_ROOT, l, 'package.json')).toString();
  const object = JSON.parse(content);

  const { nx, exports, files, ...rest } = object;

  result.push(JSON.stringify(rest));
}

writeFileSync(
  join(__dirname, '..', 'content', 'libs.json'),
  `[${result.join(',')}]`
);
