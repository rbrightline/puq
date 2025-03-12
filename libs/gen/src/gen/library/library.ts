import type { LibraryGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import { cwd, getName, updateTsconfigReferences } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';

/**
 * Generate library project
 * @param tree {@link Tree}
 * @param options {@link LibraryGeneratorSchema}
 */
export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('library');
  const target = join(cwd(), directory).split('\\').join('/');
  const __names = names(getName(directory));

  generateFiles(tree, source, target, { ...__names, target });
  updateTsconfigReferences(options.directory);
  await formatFiles(tree);
}

export default libraryGenerator;
