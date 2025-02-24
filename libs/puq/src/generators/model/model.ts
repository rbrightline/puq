import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ModelGeneratorSchema } from './schema.js';
import { join } from 'path';
import { getName } from 'src/helpers/get-name.js';
import { projectPackageJson } from '../../helpers/index.js';
export async function modelGenerator(
  tree: Tree,
  options: ModelGeneratorSchema
) {
  const source = join(__dirname, 'files');
  const target = options.directory;
  const ns = names(getName(options.directory));

  const packageJSON = await projectPackageJson();

  const modelRoot = (packageJSON as any).puq?.model ?? 'model';
  generateFiles(tree, source, target, { ...ns });
  await formatFiles(tree);

  throw new Error(modelRoot);
}

export default modelGenerator;
