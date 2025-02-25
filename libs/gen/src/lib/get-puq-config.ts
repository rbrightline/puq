import { workspaceRoot } from '@nx/devkit';
import { readFile } from '@puq/fs';
import { PackageJSON, PuqOptions } from '@puq/type';
import { join } from 'path';

export async function getPuqConfig(): Promise<PuqOptions> {
  const content = await readFile(join(workspaceRoot, 'package.json'));
  return (JSON.parse(content.toString()) as PackageJSON).puq;
}
