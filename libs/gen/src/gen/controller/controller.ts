import { formatFiles, generateFiles, names, type Tree } from '@nx/devkit';
import type { ControllerGeneratorSchema } from './schema.js';
import { filesOf } from '../files-of.js';
import { cwd, getName } from '@puq/gen-helper';
import { join } from 'path';

/**
 * Generate a resource module with controller
 * @param tree
 * @param options
 */
export async function controllerGenerator(
  tree: Tree,
  options: ControllerGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('controller');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));

  generateFiles(tree, source, target, {
    ...__names,
    directory,
  });
  await formatFiles(tree);
}

export default controllerGenerator;
