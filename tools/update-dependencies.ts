#!/usr/bin/env ts-node

import { readJSONFile } from '@puq/fs';
import { LIBS } from './common/libs.js';
import { join } from 'path';
import { PackageJSON } from '../libs/type/src/index.js';
import { writeFile } from 'fs/promises';

async function updatePeerDependencies() {
  const [, , version] = process.argv;

  LIBS.map(async (lib) => {
    const filepath = join(__dirname, '..', 'libs', lib, 'package.json');
    const content = await readJSONFile<PackageJSON>(filepath);
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

updatePeerDependencies();
