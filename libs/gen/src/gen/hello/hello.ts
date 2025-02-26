import { Tree } from '@nx/devkit';
import { HelloGeneratorSchema } from './schema.js';
import { sayHello } from '@puq/gen-helper';

export async function helloGenerator(
  tree: Tree,
  options: HelloGeneratorSchema
) {
  sayHello();
}

export default helloGenerator;
