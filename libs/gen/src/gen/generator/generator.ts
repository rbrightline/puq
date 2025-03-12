import type { GeneratorGeneratorSchema } from './schema.js';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import * as path from 'path';
import { cwd, getName } from '@puq/gen-helper';
import { filesOf } from '../files-of.js';

/**
 * Generate a generator
 * @param tree
 * @param options
 */
export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema,
) {
  const { directory } = options;
  const source = filesOf('generator');
  const target = path.join(cwd(), directory);
  const __names = names(getName(directory));

  generateFiles(tree, source, target, { ...__names });

  await formatFiles(tree);
}

export default generatorGenerator;
