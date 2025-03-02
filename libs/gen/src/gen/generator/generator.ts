import type { GeneratorGeneratorSchema } from './schema.js';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { segments } from '@puq/fs';

/**
 * Genereate a generator
 * @param tree
 * @param options
 */
export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema,
) {
  const projectRoot = `${options.directory}`;

  addProjectConfiguration(tree, options.directory, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  const filename = segments(options.directory).slice(0, -1).pop();

  if (!filename) throw new Error('filename not extracted!');
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(filename),
  });
  await formatFiles(tree);
}

export default generatorGenerator;
