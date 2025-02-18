import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { CliGeneratorSchema } from './schema';
import { getName, updateTsconfigReferences } from '../../helpers';
import { join } from 'path';

/**
 * Generate CLI project
 * @param tree
 * @param options
 */
export async function cliGenerator(tree: Tree, options: CliGeneratorSchema) {
  const source = join(__dirname, 'files');
  const target = options.name;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns });
  updateTsconfigReferences(options.name);
  await formatFiles(tree);
}

export default cliGenerator;
