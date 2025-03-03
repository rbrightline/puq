#!/usr/bin/env ts-node

import { argv } from 'process';
import { LIBS } from './common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PackageJSON } from '@puq/type' with { 'resolution-mode': 'import' };

const [, , __lib, __version] = argv;

export async function updateVersionOf(lib: string, version: string) {
  const preResult = LIBS.map(async (e) => {
    const P: PackageJSON = JSON.parse(
      (
        await readFile(join(__dirname, '..', 'libs', lib, 'package.json'))
      ).toString(),
    );

    [P.dependencies, P.devDependencies, P.peerDependencies].forEach(
      (dependency) => {
        if (dependency) {
          const entries = Object.entries(dependency);
          for (const [key] of entries) {
            if (key === lib) {
              dependency[key] = version;
            }
          }
        }
      },
    );
  });

  await Promise.all(preResult);
}

updateVersionOf(__lib, __version);
