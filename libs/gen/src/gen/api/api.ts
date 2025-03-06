import type { ApiGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName } from '@puq/gen-helper';

/**
 * Generate rest api project
 * @param tree
 * @param options
 */
export async function apiGenerator(tree: Tree, options: ApiGeneratorSchema) {
  const { directory } = options;
  const source = join(__dirname, 'files');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));
  generateFiles(tree, source, target, { ...__names });
  await formatFiles(tree);
}

export default apiGenerator;
