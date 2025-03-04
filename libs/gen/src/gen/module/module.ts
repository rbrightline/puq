import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import type { ModuleGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '@puq/gen-helper';

/**
 * Generate resource module with rest and database module
 * @param tree
 * @param options
 */
export async function moduleGenerator(
  tree: Tree,
  options: ModuleGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const __names = names(getName(options.name));
  generateFiles(tree, source, target, { ...__names });
  await formatFiles(tree);
}

export default moduleGenerator;
