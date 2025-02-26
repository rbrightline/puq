import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import { ModelGeneratorSchema } from './schema.js';
import { join, resolve } from 'path';
import { readYamlFile } from '@puq/fs';
import { getName, ModelManager, readProjectPackageJSON } from '@puq/gen-helper';
import { cwd } from 'process';
import { Model } from '@puq/type';
/**
 * Generate model type
 * @param tree
 * @param options
 */
export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = resolve(cwd(), options.directory);

  console.table({ target });
  const modelName = getName(options.directory);

  console.table({ modelName });

  const ns = names(modelName);

  console.table({
    ...ns,
  });
  const packageJSON = await readProjectPackageJSON();

  console.table({ modelName });

  const modelFilePath = join(
    workspaceRoot,
    packageJSON.puq.metadataRoot,
    `${modelName}.model.yaml`
  );

  console.table({ modelFilePath });
  const yamlContent = await readYamlFile<Model>(modelFilePath);

  console.log(yamlContent);
  const modelManager = new ModelManager(yamlContent);

  generateFiles(tree, source, target, {
    ...ns,
    properties: modelManager.typeProperties(),
  });
  await formatFiles(tree);
}

export default modelGenerator;
