#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { DIRS } from './dirs';
import { chdir } from 'process';
import { join } from 'path';

chdir(join(__dirname, '..'));

export async function docs() {
  await Promise.all(
    DIRS.map((e) => {
      exec(`npx nx doc @puq/${e}`, (err, stdout, stderr) => {
        if (stdout) console.log(stdout);
        if (err) console.error(err);
        if (stderr) console.error(stderr);
      });
    })
  );
}

docs();
