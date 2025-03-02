import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import { ModelGeneratorSchema } from './schema.js';
import { join, resolve } from 'path';
import { readYAMLFile } from '@puq/fs';
import { getName, ModelManager, readProjectPackageJSON } from '@puq/gen-helper';
import { cwd } from 'process';
import { Model } from '@puq/type';

import * as Printer from '@puq/printer';

console.log(Printer);
/**
 * Generate model type
 * @param tree
 * @param options
 */
export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema,
) {
  const source = join(__dirname, 'files');
  const target = resolve(cwd(), options.directory);

  const modelName = getName(options.directory);

  const ns = names(modelName);

  const packageJSON = await readProjectPackageJSON();

  const modelFilePath = join(
    workspaceRoot,
    packageJSON.puq.metadataRoot,
    `${modelName}.model.yaml`,
  );

  const yamlContent = await readYAMLFile<Model>(modelFilePath);

  const modelManager = new ModelManager(yamlContent);

  generateFiles(tree, source, target, {
    ...ns,
    properties: modelManager.typeProperties(),
  });
  await formatFiles(tree);
}

export default modelGenerator;
