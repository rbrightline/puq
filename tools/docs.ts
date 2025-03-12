#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { chdir } from 'process';
import { join } from 'path';
import { LIBS } from './common';

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
  await Promise.all(LIBS.map(doc));
}

docs();
