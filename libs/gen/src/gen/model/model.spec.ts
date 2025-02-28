import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';
import { modelGenerator } from './model.js';
import { ModelGeneratorSchema } from './schema.js';
import * as path from 'path';
import * as puqFs from '@puq/fs';
import * as genHelper from '@puq/gen-helper';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('@puq/fs', () => ({
  readYamlFile: vi.fn(),
}));

vi.mock('@puq/gen-helper', () => ({
  getName: vi.fn(),
  ModelManager: vi.fn().mockImplementation(() => ({
    typeProperties: vi
      .fn()
      .mockReturnValue({ prop1: 'string', prop2: 'number' }),
  })),
  readProjectPackageJSON: vi.fn(),
}));

describe('modelGenerator', () => {
  let tree: Tree;
  const options: ModelGeneratorSchema = {
    directory: 'models/example',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    vi.spyOn(genHelper, 'getName').mockReturnValue('example');
    vi.spyOn(genHelper, 'readProjectPackageJSON').mockResolvedValue({
      puq: { metadataRoot: 'metadata' },
    });
    vi.spyOn(puqFs, 'readYamlFile').mockResolvedValue({
      name: 'example',
      properties: {},
    });
  });

  it('should generate model files', async () => {
    await modelGenerator(tree, options);

    expect(genHelper.getName).toHaveBeenCalledWith(options.directory);
    expect(puqFs.readYamlFile).toHaveBeenCalledWith(
      path.join(expect.any(String), 'metadata', 'example.model.yaml')
    );
  });
});
