import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import type { ModuleGeneratorSchema } from './schema.js';
import { join } from 'path';
import { cwd, getName } from '@puq/gen-helper';

/**
 * Generate resource module with rest and database module
 * @param tree
 * @param options
 */
export async function moduleGenerator(
  tree: Tree,
  options: ModuleGeneratorSchema,
) {
  const { directory } = options;
  const source = join(__dirname, 'files');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));
  generateFiles(tree, source, target, { ...__names });
  await formatFiles(tree);
}

export default moduleGenerator;
