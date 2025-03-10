import type { PackageJSON } from '@puq/type';
import { workspaceRoot } from '@nx/devkit';
import { readJSONFile } from '@puq/fs';
import { resolve } from 'path';

export async function readProjectPackageJSON(): Promise<PackageJSON> {
  const resolvedPath = resolve(workspaceRoot, 'package.json');
  return await readJSONFile<PackageJSON>(resolvedPath);
}
