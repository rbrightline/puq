import type { Tree } from '@nx/devkit';
import type { ModelGeneratorSchema } from './schema.js';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join, resolve } from 'path';
import { getName } from '@puq/gen-helper';
import { cwd } from 'process';
import '@puq/printer';
/**
 * Generate model type
 * @param tree
 * @param options
 */
export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = resolve(cwd(), options.directory);

  const modelName = getName(options.directory);

  const __names = names(modelName);

  generateFiles(tree, source, target, {
    ...__names,
    properties: '',
    relations: '',
    generics: '',
    actualGenerics: '',
  });
  await formatFiles(tree);
}

export default modelGenerator;
