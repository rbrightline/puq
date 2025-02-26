import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { CliGeneratorSchema } from './schema.js';
import { getName, updateTsconfigReferences } from '@puq/gen-helper';
import { join } from 'path';

/**
 * Generate CLI library project
 * @param tree
 * @param options
 */
export async function cliGenerator(tree: Tree, options: CliGeneratorSchema) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const ns = names(getName(options.directory));
  generateFiles(tree, source, target, { ...ns, target });
  updateTsconfigReferences(options.directory);
  await formatFiles(tree);
}

export default cliGenerator;
