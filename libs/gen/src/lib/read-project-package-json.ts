import { workspaceRoot } from '@nx/devkit';
import { readJSONFile } from '@puq/fs';
import { PackageJSON } from '@puq/type';
import { join } from 'path';

export async function readProjectPackageJSON(): Promise<PackageJSON> {
  return await readJSONFile<PackageJSON>(join(workspaceRoot, 'package.json'));
}
