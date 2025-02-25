import { readFile } from '@puq/fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { Model } from '@puq/type';
/**
 * @param metadataRoot the root directory of the `.model.yaml` metadata files
 * @param name
 * @returns
 */
export async function getModelMetadata(
  metadataRoot: string,
  name: string
): Promise<Model> {
  const __content = await readFile(join(metadataRoot, `${name}.model.yaml`), {
    recursive: true,
  });
  const modelMetadata = await load(__content.toString());

  return modelMetadata as Model;
}

export function modelProperties(model: Model) {
  return Object.entries(model.properties ?? []).map(([name, value]) => {
    return { name, ...value };
  });
}

export function relationProperties(model: Model) {
  return Object.entries(model.relations ?? []).map(([name, value]) => {
    return { name, ...value };
  });
}
