import type { EntityGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join, resolve } from 'path';
import { getName } from '@puq/gen-helper';
import { cwd } from 'process';

/**
 * Generate entity and dto
 * @param tree
 * @param options
 */
export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = resolve(cwd(), options.directory);
  const __names = names(getName(options.directory));

  generateFiles(tree, source, target, {
    ...__names,
    properties: '// properties',
    relations: '// relations',
    columns: '// columns',
    viewColumns: '// viewColumns',
  });
  await formatFiles(tree);
}

export default entityGenerator;
