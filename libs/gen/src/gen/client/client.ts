import type { ClientGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';

/**
 * Generate an angular-client application
 * @param tree
 * @param options
 */
export async function clientGenerator(
  tree: Tree,
  options: ClientGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('client');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));
  generateFiles(tree, source, target, { ...__names });
  await formatFiles(tree);
}

export default clientGenerator;
