#!/usr/bin/env ts-node

import { argv } from 'process';
import { LIBS } from './common';
import { readFile } from 'fs/promises';
import { join } from 'path';

const [, , lib, version] = argv;

export async function updateVersionOf(
  lib: Readonly<string>,
  version: Readonly<string>,
) {
  const preResult = LIBS.map(async (e) => {
    const packageJSON = JSON.parse(
      (
        await readFile(join(__dirname, '..', 'libs', lib, 'package.json'))
      ).toString(),
    );

    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(
      (dependencyBlock) => {
        const version = '';
        const dependency = packageJSON[dependencyBlock];
        if (dependency) {
          const entries = Object.entries(dependency);
          for (const [key] of entries) {
            if (key === lib) {
              packageJSON.dependencies[key] = version;
            }
          }
        }
      },
    );
  });

  await Promise.all(preResult);
}
