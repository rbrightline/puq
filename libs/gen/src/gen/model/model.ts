import type { Tree } from '@nx/devkit';
import type { ModelGeneratorSchema } from './schema.js';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getModel, getName, ModelManager } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';

/**
 * Generate model type
 * @param tree
 * @param options
 */
export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('model');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));
  const model = await getModel(__names.fileName);
  const M = new ModelManager(model);

  generateFiles(tree, source, target, {
    ...__names,
    properties: M.typeProperties(),
    generics: M.generics(),
    actualGenerics: M.actualGenerics(),
    imports: M.imports(),
  });
  await formatFiles(tree);
}

export default modelGenerator;
