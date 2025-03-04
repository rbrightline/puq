import type { CliGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
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
  const __names = names(getName(options.directory));
  generateFiles(tree, source, target, { ...__names, target });
  updateTsconfigReferences(options.directory);
  await formatFiles(tree);
}

export default cliGenerator;
