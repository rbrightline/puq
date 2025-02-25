import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ModuleGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '../../lib/index.js';

/**
 * Generate resource module with rest and database module
 * @param tree
 * @param options
 */
export async function moduleGenerator(
  tree: Tree,
  options: ModuleGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default moduleGenerator;
