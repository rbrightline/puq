import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ApiGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '@puq/gen-helper';

/**
 * Generate an nestjs rest api project
 * @param tree
 * @param options
 */
export async function apiGenerator(tree: Tree, options: ApiGeneratorSchema) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const ns = names(getName(options.directory));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default apiGenerator;
