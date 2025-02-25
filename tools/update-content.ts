#!/usr/bin/env ts-node

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const LIBS_ROOT = join(__dirname, '..', 'libs');
const libs = readdirSync(LIBS_ROOT);

const result: string[] = [];
for (const l of libs) {
  result.push(readFileSync(join(LIBS_ROOT, l, 'package.json')).toString());
}

writeFileSync(
  join(__dirname, '..', 'content', 'libs.json'),
  `[${result.join(',')}]`
);
