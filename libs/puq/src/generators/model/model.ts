import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ModelGeneratorSchema } from './schema';
import { join } from 'path';
import { getName } from 'src/helpers';

export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);
}

export default modelGenerator;
