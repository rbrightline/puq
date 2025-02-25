import { readFile } from '@puq/fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { Model, PropertyOptions, RelationOptions } from '@puq/type';
import {
  propertyType,
  propertyDefinition,
  relationDefinition,
  propertyDecorator,
} from '@puq/printer';
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

export class ModelManager {
  constructor(protected readonly model: Model) {}

  protected entries<
    V extends PropertyOptions | RelationOptions,
    T extends Record<string, V>
  >(options?: T): V[] | undefined {
    if (!options) return;
    return Object.entries(options).map(([name, value]) => ({ name, ...value }));
  }

  protected properties(): PropertyOptions[] | undefined {
    return this.entries(this.model.properties);
  }

  protected relations(): RelationOptions[] | undefined {
    return this.entries(this.model.relations);
  }

  protected propertyType(options: PropertyOptions): string {
    return propertyType(options);
  }

  typeProperties() {
    const __properies = this.properties()
      ?.map((e) => propertyDefinition(e))
      .join('\n');

    const __relations = this.relations()
      ?.map((e) => relationDefinition(e))
      .join('\n');

    return [__properies, __relations].join('\n');
  }

  entityProperties() {
    const __properies = this.properties()
      ?.map((e) =>
        [propertyDecorator('Column', e), propertyDefinition(e)].join('\n')
      )
      .join('\n');

    const __relations = this.relations()
      ?.map((e) => [relationDefinition(e), relationDefinition(e)].join('\n'))
      .join('\n');

    return [__properies, __relations].join('\n');
  }
}
