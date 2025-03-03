#!/usr/bin/env ts-node

import { argv } from 'process';
import { LIBS } from './common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import type { PackageJSON } from '@puq/type' with { 'resolution-mode': 'import' };

const [, , library, version] = argv;

export async function updateVersionOf(lib: string, ver: string) {
  const preResult = LIBS.map(async (currenctLibrary) => {
    // Map
    const filepath = join(
      __dirname,
      '..',
      'libs',
      currenctLibrary,
      'package.json',
    );
    const content: PackageJSON = JSON.parse(
      (await readFile(filepath)).toString(),
    );

    [
      content.dependencies,
      content.devDependencies,
      content.peerDependencies,
    ].forEach((dependency) => {
      if (dependency) {
        const entries = Object.entries(dependency);
        for (const [key] of entries) {
          if (key === lib) {
            dependency[key] = ver;
          }
        }
      }
    });

    await writeFile(filepath, JSON.stringify(content));
    // Map end
  });

  await Promise.all(preResult);
}

updateVersionOf(library, version);
