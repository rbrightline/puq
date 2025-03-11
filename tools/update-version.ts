#!/usr/bin/env ts-node
import { argv, chdir } from 'process';
import { LIBS } from './common';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { DependOnProperty } from '../libs/validation/src';

async function updateVersion() {
  chdir(join(__dirname, '..'));

  const [, , version] = argv;

  const dependencyVersion = `^${version}`;

  LIBS.map(async (library) => {
    const packageJSON: any = JSON.parse(
      (await readFile(join(__dirname, library, 'package.json'))).toString(),
    );

    packageJSON.version = version;

    const { dependencies, peerDependencies, devDependencies } = packageJSON;

    [dependencies, peerDependencies, devDependencies]
      .filter((e) => e)
      .map((dependencyObject) => {
        const entries = Object.entries(DependOnProperty);
        for (const [key] of entries) {
          if (key.startsWith('@puq')) {
            dependencyObject[key] = dependencyVersion;
          }
        }
      });

    await writeFile(
      join(__dirname, library, 'package.json'),
      JSON.stringify(packageJSON),
    );
  });
}

updateVersion();
