import { workspaceRoot } from '@nx/devkit';
import { readJSONFile } from '@puq/fs';
import { PackageJSON } from '@puq/type';
import { resolve } from 'path';

export async function readProjectPackageJSON(): Promise<PackageJSON> {
  const resolvedPath = resolve(workspaceRoot, 'package.json');
  console.log(resolvedPath, '<< readProjectPackageJSON');
  return await readJSONFile<PackageJSON>(resolvedPath);
}
