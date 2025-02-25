import { workspaceRoot } from '@nx/devkit';
import { PackageJSON } from '@puq/type';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function projectPackageJson(): Promise<PackageJSON> {
  const packageJSON = await readFile(join(workspaceRoot, 'package.json')).then(
    (e) => JSON.parse(e.toString())
  );

  return packageJSON;
}
