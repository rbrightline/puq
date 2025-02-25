#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { DIRS } from './dirs';
import { chdir } from 'process';
import { join } from 'path';

chdir(join(__dirname, '..'));

Promise.all(
  DIRS.map((e) => {
    exec(`npx nx build ${e}`);
  })
);
