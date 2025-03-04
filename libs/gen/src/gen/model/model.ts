import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import type { ModelGeneratorSchema } from './schema.js';
import { join, resolve } from 'path';
import { getName } from '@puq/gen-helper';
import { cwd } from 'process';
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

  const __names = names(modelName);

  // const packageJSON = await readProjectPackageJSON();

  // const modelFilePath = join(
  //   workspaceRoot,
  //   packageJSON.puq.metadataRoot,
  //   `${modelName}.model.yaml`,
  // );

  // const yamlContent = await readYAMLFile<Model>(modelFilePath);

  // const modelManager = new ModelManager(yamlContent);

  generateFiles(tree, source, target, {
    ...__names,
    properties: '', //modelManager.typeProperties(),
    relations: '',
    generics: '',
    actualGenerics: '',
  });
  await formatFiles(tree);
}

export default modelGenerator;
