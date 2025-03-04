import type { LibraryGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { getName, updateTsconfigReferences } from '@puq/gen-helper';

/**
 * Generate library project
 * @param tree {@link Tree}
 * @param options {@link LibraryGeneratorSchema}
 */
export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const __names = names(getName(options.directory));
  generateFiles(tree, source, target, { ...__names, target });
  updateTsconfigReferences(options.directory);
  await formatFiles(tree);
}

export default libraryGenerator;
