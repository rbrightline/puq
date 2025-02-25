import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { EntityGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '../../lib/index.js';

/**
 * Generate an entity and dtos
 * @param tree
 * @param options
 */
export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const ns = names(getName(options.directory));

  generateFiles(tree, source, target, {
    ...ns,
    properties: '// properties',
    columns: '// columns',
    viewColumns: '// viewColumns',
  });
  await formatFiles(tree);
}

export default entityGenerator;
