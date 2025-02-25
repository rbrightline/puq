import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { GeneratorGeneratorSchema } from './schema.js';
import { filename } from '@puq/fs';
/**
 * Genereate a generator
 * @param tree
 * @param options
 */
export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema
) {
  const projectRoot = `${options.directory}`;

  addProjectConfiguration(tree, options.directory, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...names(filename(options.directory)),
  });
  await formatFiles(tree);
}

export default generatorGenerator;
