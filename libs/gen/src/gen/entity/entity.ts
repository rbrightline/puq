import '@puq/fs';
import '@puq/printer';
import type { EntityGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName, ModelManager } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';
import { findFile, readYAMLFile } from '@puq/fs';
import type { Model } from '@puq/type';

/**
 * Generate entity and dto
 * @param tree
 * @param options
 */
export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('entity');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));

  const foundFilePath = await findFile(__names.fileName + '.model.yaml');
  const model = await readYAMLFile<Model>(foundFilePath);
  const M = new ModelManager(model);

  generateFiles(tree, source, target, {
    ...__names,
    properties: M.dtoProperties(),
    columns: M.entityProperties(),
    entityGenerics: M.generics(),
    dtoGenerics: M.dtoGenerics(),
    entityImports: M.imports(),
  });
  await formatFiles(tree);
}

export default entityGenerator;
