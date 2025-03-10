#!/usr/bin/env ts-node

import { readFileSync } from 'fs';
import { LIBS } from './common';
import { join } from 'path';

const result: Record<string, string[]> = {};

for (const lib of LIBS) {
  const c = readFileSync(join(__dirname, '..', 'libs', lib, 'package.json'));
  const o = JSON.parse(c.toString());
  if (!result[o.version]) result[o.version] = [];
  result[o.version].push(o.name);
}

console.log(result);
