import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { EntityGeneratorSchema } from './schema';
import { join } from 'path';
import { getName } from 'src/helpers';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const ns = names(getName(options.directory));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default entityGenerator;
