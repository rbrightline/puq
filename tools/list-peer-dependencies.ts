#!/usr/bin/env ts-node

import { readFileSync } from 'fs';
import { LIBS } from './common';
import { join } from 'path';

for (const lib of LIBS) {
  const c = readFileSync(join(__dirname, '..', 'libs', lib, 'package.json'));

  const o = JSON.parse(c.toString());

  if (o.peerDependencies) console.log(o.name, o.peerDependencies);
}
