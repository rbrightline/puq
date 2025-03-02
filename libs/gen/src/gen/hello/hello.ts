import type { HelloGeneratorSchema } from './schema.js';
import { Tree } from '@nx/devkit';

export async function helloGenerator(
  tree: Tree,
  options: HelloGeneratorSchema,
) {
  console.log(options);
}

export default helloGenerator;
