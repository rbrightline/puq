import type { EntityGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName } from '@puq/gen-helper';
import '@puq/fs';
import '@puq/printer';
/**
 * Generate entity and dto
 * @param tree - Tree
 * @param options - EntityGeneratorSchema
 */
export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema,
) {
  const { directory } = options;
  const source = join(__dirname, 'files');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));

  generateFiles(tree, source, target, {
    ...__names,
    properties: '',
    relations: '',
    columns: '',
    viewColumns: '',
    actualGenerics: '',
  });
  await formatFiles(tree);
}

export default entityGenerator;
