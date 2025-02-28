import { Tree } from '@nx/devkit';
import { HelloGeneratorSchema } from './schema.js';

export async function helloGenerator(
  tree: Tree,
  options: HelloGeneratorSchema
) {
  console.log(options);
}

export default helloGenerator;
