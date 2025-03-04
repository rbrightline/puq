import type { ClientGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { getName } from '@puq/gen-helper';

/**
 * Generate an angular-client application
 * @param tree
 * @param options
 */
export async function clientGenerator(
  tree: Tree,
  options: ClientGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const __names = names(getName(options.directory));
  generateFiles(tree, source, target, { ...__names });
  await formatFiles(tree);
}

export default clientGenerator;
