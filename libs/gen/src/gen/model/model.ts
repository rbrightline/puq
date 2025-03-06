import type { Tree } from '@nx/devkit';
import type { ModelGeneratorSchema } from './schema.js';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName } from '@puq/gen-helper';
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
  const { directory } = options;
  const source = join(__dirname, 'files');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));

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
