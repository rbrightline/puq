import '@puq/fs';
import '@puq/printer';
import type { EntityGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName, ModelManager, getModel } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';

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

  const model = await getModel(__names.fileName);
  const M = new ModelManager(model);

  generateFiles(tree, source, target, {
    ...__names,
    properties: M.dtoProperties(),
    columns: M.entityProperties(),
    actualGenerics: M.actualGenerics(),
    imports: M.imports(),
  });

  await formatFiles(tree);
}

export default entityGenerator;
