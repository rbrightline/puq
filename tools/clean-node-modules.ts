#!/usr/bin/env ts-node

import { chdir } from 'process';
import { LIBS } from './common';
import { join } from 'path';
import { exec } from 'child_process';

chdir(join(__dirname, '..', 'libs', 'boot'));

export function cleanNodeModules() {
  return Promise.all(
    LIBS.map((l) => {
      return new Promise((res, rej) => {
        chdir(join('..', l));

        exec(`rm -rf dist`, (err) => {
          if (err) {
            rej(err);
          } else {
            res(true);
          }
        });
        exec(`rm -rf node_modules`, (err) => {
          if (err) {
            rej(err);
          } else {
            res(true);
          }
        });
      });
    }),
  );
}

cleanNodeModules();
