import type { Model, PropertyOptions, RelationOptions } from '@puq/type';
import {
  propertyType,
  propertyDefinition,
  relationDefinition,
  propertyDecorator,
  relationDecorator,
  propertyDecoratorForRelations,
  convertRelationOptionsToPropertyOptions,
} from '@puq/printer';
import { names } from '@nx/devkit';

export class ModelManager {
  constructor(protected readonly model: Model) {}

  protected entries<
    V extends PropertyOptions | RelationOptions,
    T extends Record<string, V>,
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
    const __properties = this.properties()
      ?.map((e) => propertyDefinition(e))
      .join('\n');

    const __relations = this.relations()
      ?.map((e) => relationDefinition(e))
      .join('\n');

    return [__properties, __relations].filter((e) => e).join('\n');
  }

  dtoProperties() {
    const __properties = this.properties()
      ?.map((e) =>
        [propertyDecorator('Property', e), propertyDefinition(e)].join('\n'),
      )
      .join('\n');

    const __relations = this.relations()
      ?.map((e) =>
        [
          propertyDecoratorForRelations('Property', e),
          propertyDefinition(convertRelationOptionsToPropertyOptions(e)),
        ].join('\n'),
      )
      .join('\n');

    return [__properties, __relations].filter((e) => e).join('\n');
  }

  entityProperties() {
    const __properties = this.properties()
      ?.map((e) =>
        [propertyDecorator('Column', e), propertyDefinition(e)].join('\n'),
      )
      .join('\n');

    const __relations = this.relations()
      ?.map((e) =>
        [relationDecorator('Relation', e), relationDefinition(e)].join('\n'),
      )
      .join('\n');

    return [__properties, __relations].filter((e) => e).join('\n');
  }

  viewProperties() {
    const __properties = this.properties()
      ?.map((e) =>
        [propertyDecorator('ViewColumn', e), propertyDefinition(e)].join('\n'),
      )
      .join('\n');

    const __relations = this.relations()
      ?.map((e) => [relationDefinition(e), relationDefinition(e)].join('\n'))
      .join('\n');

    return [__properties, __relations].filter((e) => e).join('\n');
  }

  actualGenerics() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target;
      }),
    );
    if (targets.size > 0) {
      return `<${[...targets]
        .filter((e) => e)
        .map((e) => `${e}Model`)
        .join(',')}>`;
    }
    return '';
  }

  generics() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target;
      }),
    );
    if (targets.size > 0) {
      return `<${[...targets]
        .filter((e) => e)
        .map((e) => `${e} = IDModel`)
        .join(',')}>`;
    }
    return '';
  }

  dtoGenerics() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target;
      }),
    );
    if (targets.size > 0) {
      return `<${[...targets].map((e) => 'IDDto').join(',')}>`;
    }

    return '';
  }

  imports() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target.toString();
      }),
    );

    if (targets.size > 0) {
      return [...targets]
        .filter((e) => e)
        .map((e) => {
          return `import type {${e}Model} from '../${names(e).fileName}/${names(e).fileName}.model.js'`;
        })
        .join('\n');
    }
    return '';
  }
}
