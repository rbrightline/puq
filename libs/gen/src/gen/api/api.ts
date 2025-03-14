import type { ApiGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName, updateTsconfigReferences } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';
import { repositoryName } from '../repository-name.js';

/**
 * Generate rest api project
 * @param tree
 * @param options
 */
export async function apiGenerator(tree: Tree, options: ApiGeneratorSchema) {
  const { directory } = options;
  const source = filesOf('api');
  const target = join(cwd(), directory);
  const __names = names(getName(directory));
  const repository = await repositoryName();
  generateFiles(tree, source, target, { ...__names, directory, repository });
  updateTsconfigReferences(directory);
  await formatFiles(tree);
}

export default apiGenerator;
