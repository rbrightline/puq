#!/usr/bin/env ts-node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { LIBS, SERVICES } from './common';

const result: string[] = [];

for (const libraryPath of [
  ...LIBS.map((e) => join(__dirname, '..', 'libs', e)),
  ...SERVICES.map((e) => join(__dirname, '..', 'services', e)),
]) {
  const content = readFileSync(join(libraryPath, 'package.json')).toString();
  const object = JSON.parse(content);

  const { nx, exports, files, ...rest } = object;

  rest.summary = rest.description.slice(0, 100) + '...';

  result.push(JSON.stringify(rest));
}

writeFileSync(
  join(__dirname, '..', 'content', 'libs.json'),
  `[${result.join(',')}]`,
);
