#!/usr/bin/env ts-node
import { argv, chdir } from 'process';
import { LIBS, SERVICES } from './common';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

/**
 * Update all versions
 */
async function updateVersion() {
  chdir(join(__dirname, '..'));

  const [, , version] = argv;

  const dependencyVersion = `^${version}`;

  [
    ...LIBS.map((e) => join('libs', e)),
    ...SERVICES.map((e) => join('services', e)),
  ].map(async (library) => {
    const filepath = join(library, 'package.json');
    const fileContent = await readFile(filepath);
    const fileJSON: any = JSON.parse(fileContent.toString());
    const { dependencies, peerDependencies, devDependencies } = fileJSON;

    [dependencies, peerDependencies, devDependencies]
      .filter((e) => e)
      .forEach((dependencyObject) => {
        const entries = Object.entries(dependencyObject);
        for (const [key] of entries) {
          if (key.startsWith('@puq')) {
            dependencyObject[key] = dependencyVersion;
          }
        }
      });

    await writeFile(filepath, JSON.stringify(fileJSON));
  });
}

updateVersion();
