#!/usr/bin/env ts-node

import { join } from 'path';
import { LIBS } from './common';
import { readFile } from 'fs/promises';

async function checkBuilds() {
  await Promise.all(
    LIBS.map(async (e) => {
      try {
        return await readFile(
          join(__dirname, '..', 'libs', e, 'dist', 'index.d.ts'),
        );
      } catch {
        console.log(`${e} | Not have decleration`);
        return e;
      }
    }),
  );
}

checkBuilds();
