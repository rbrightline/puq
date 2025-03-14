import { names, workspaceRoot } from '@nx/devkit';
import { findFile, readYAMLFile } from '@puq/fs';
import type { Model } from '@puq/type';
import { join } from 'path';

export async function getModel(name: string): Promise<Model> {
  const foundFilePath = await findFile(
    join(workspaceRoot, 'model', names(name).fileName + '.model.yaml'),
    { recursive: true },
  );

  return await readYAMLFile<Model>(foundFilePath);
}
