#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { DIRS } from './dirs';
import { chdir } from 'process';
import { join } from 'path';

chdir(join(__dirname, '..'));

export async function doc(library: string) {
  return new Promise((res, rej) => {
    exec(`npx nx doc @puq/${library}`, (err, stdout, stderr) => {
      if (stdout) res(stdout);
      if (err) rej(err);
      if (stderr) rej(stderr);
    });
  });
}
export async function docs() {
  await Promise.all(DIRS.map(doc));
}

docs();
