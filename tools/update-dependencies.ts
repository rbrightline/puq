#!/usr/bin/env ts-node

import { LIBS } from './common/libs.js';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

async function updatedependencies() {
  const [, , version] = process.argv;

  LIBS.map(async (lib) => {
    const filepath = join(__dirname, '..', 'libs', lib, 'package.json');
    const content = JSON.parse((await readFile(filepath)).toString());
    if (content.dependencies) {
      for (const name in content.dependencies) {
        if (name.startsWith('@puq')) {
          content.dependencies[name] = `${version}`;
        }
      }
    }
    await writeFile(filepath, JSON.stringify(content));
  });
}

updatedependencies();
