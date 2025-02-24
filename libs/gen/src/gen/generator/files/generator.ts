import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';

import { GeneratorGeneratorSchema } from './schema.js';
import { join, normalize } from 'path';

export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema
) {
  const ROOT = normalize(options.directory);
  const SOURCE = join(__dirname, 'files');
  const segments = options.directory.split('\\');
  const name = segments.slice(-1).pop();

  generateFiles(tree, SOURCE, ROOT, {
    ...names(name),
  });
  await formatFiles(tree);
}

export default generatorGenerator;
