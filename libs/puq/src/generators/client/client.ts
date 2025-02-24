import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ClientGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from '../../helpers/index.js';

export async function clientGenerator(
  tree: Tree,
  options: ClientGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default clientGenerator;
