import type { Tree } from '@nx/devkit';
import type { ModelGeneratorSchema } from './schema.js';
import type { Model } from '@puq/type';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName, ModelManager } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';
import { findFile, readYAMLFile } from '@puq/fs';

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

  const foundFilePath = await findFile(__names.fileName + '.model.yaml');
  const model = await readYAMLFile<Model>(foundFilePath);
  const M = new ModelManager(model);

  generateFiles(tree, source, target, {
    ...__names,
    properties: M.typeProperties(),
    generics: M.generics(),
    imports: M.imports(),
  });
  await formatFiles(tree);
}

export default modelGenerator;
