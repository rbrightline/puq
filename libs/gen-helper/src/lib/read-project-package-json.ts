import type { PackageJSON } from '@puq/type';
import { workspaceRoot } from '@nx/devkit';
import { readJSONFile } from '@puq/fs';
import { resolve } from 'path';

/**
 * Get the workspace's project.json content as object
 * @returns
 */
export async function readProjectPackageJSON(): Promise<PackageJSON> {
  const resolvedPath = resolve(workspaceRoot, 'package.json');
  return await readJSONFile<PackageJSON>(resolvedPath);
}
