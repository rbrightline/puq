import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ApiGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '../../helpers/index.js';

export async function apiGenerator(tree: Tree, options: ApiGeneratorSchema) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default apiGenerator;
