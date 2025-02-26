import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ModelGeneratorSchema } from './schema.js';
import { join } from 'path';
import {
  getName,
  ModelManager,
  readProjectPackageJSON,
} from '../../lib/index.js';
import { readYamlFile } from '@puq/fs';
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
  const target = options.directory;
  const modelName = getName(options.directory);
  const ns = names(modelName);

  const packageJSON = await readProjectPackageJSON();
  const modelManager = new ModelManager(
    await readYamlFile(
      join(packageJSON.puq.metadataRoot, `${modelName}.model.yaml`)
    )
  );

  const modelRoot = (packageJSON as any).puq?.model ?? 'model';
  generateFiles(tree, source, target, {
    ...ns,
    properties: modelManager.typeProperties(),
  });
  await formatFiles(tree);

  throw new Error(modelRoot);
}

export default modelGenerator;
