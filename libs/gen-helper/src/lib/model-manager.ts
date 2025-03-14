import type { Model, PropertyOptions, RelationOptions } from '@puq/type';
import {
  propertyType,
  propertyDefinition,
  relationDefinition,
  propertyDecorator,
  relationDecorator,
  propertyDecoratorForRelations,
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

    return [__properties, __relations].join('\n');
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
          relationDefinition(e),
        ].join('\n'),
      )
      .join('\n');

    return [__properties, __relations].join('\n');
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

    return [__properties, __relations].join('\n');
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

    return [__properties, __relations].join('\n');
  }

  generics() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target;
      }),
    );
    return `<${[...targets].join(',')}>`;
  }

  dtoGenerics() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target;
      }),
    );
    return `<${[...targets].map((e) => 'IDDto').join(',')}>`;
  }

  imports() {
    const targets = new Set(
      this.relations()?.map((e) => {
        return e.target.toString();
      }),
    );
    return [...targets].map((e) => {
      return `import type {${e}} from '../${names(e).fileName}/${names(e).fileName}.model.js'`;
    });
  }
}
