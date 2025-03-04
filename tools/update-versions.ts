#!/usr/bin/env ts-node

import { LIBS } from './common';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

async function udpate() {
  const [, , version] = process.argv;

  LIBS.map(async (lib) => {
    const filepath = join(__dirname, '..', 'libs', lib, 'package.json');
    const content = JSON.parse((await readFile(filepath)).toString());
    content.version = version;
    if (content.dependencies) {
      for (const name in content.dependencies) {
        if (name.startsWith('@puq')) {
          content.dependencies[name] = `^${version}`;
        }
      }
    }
    if (content.peerDependencies) {
      for (const name in content.peerDependencies) {
        if (name.startsWith('@puq')) {
          content.peerDependencies[name] = `^${version}`;
        }
      }
    }

    await writeFile(filepath, JSON.stringify(content));
  });
}

udpate();
