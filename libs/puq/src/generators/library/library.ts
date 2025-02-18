import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateTsConfigsToJs,
} from '@nx/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';

export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;

  updateTsConfigsToJs(tree, { projectRoot });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default libraryGenerator;
