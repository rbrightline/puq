import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { controllerGenerator } from './controller.js';
import { ControllerGeneratorSchema } from './schema.js';

describe('controller generator', () => {
  let tree: Tree;
  const options: ControllerGeneratorSchema = { directory: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await controllerGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
