import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { join } from 'path';
import { LibraryGeneratorSchema } from './schema.js';
import { getName, updateTsconfigReferences } from '@puq/gen-helper';

/**
 * Generate library project
 * @param tree
 * @param options
 */
export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = `${options.name}`;
  const ns = names(getName(options.name));
  generateFiles(tree, source, target, { ...ns, target });
  updateTsconfigReferences(options.name);
  await formatFiles(tree);
}

export default libraryGenerator;
