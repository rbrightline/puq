import type { RelationOptions, ObjectLiteral } from '@puq/type';
import {
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

/**
 * Relation decorator
 * @param options relation options {@link RelationOptions}
 * @returns - {@link PropertyDecorator}
 */
export function Relation(options: RelationOptions): PropertyDecorator {
  return (t, p) => {
    const { type, target } = options;

    const pickColumn = (e: ObjectLiteral) =>
      e[(options as any)['refColumn'] ?? 'id'];

    switch (type) {
      case 'one-to-one':
        OneToOne(target, pickColumn, options)(t, p);
        break;
      case 'one-to-many':
        OneToMany(target, pickColumn, options)(t, p);
        break;
      case 'many-to-one':
        ManyToOne(target, pickColumn, options)(t, p);
        break;
      case 'many-to-many':
        ManyToMany(target, pickColumn, options)(t, p);
        break;
    }

    switch (type) {
      case 'one-to-one':
      case 'many-to-one': {
        if (options.join === true) {
          JoinColumn()(t, p);
        }
        break;
      }
      case 'one-to-many':
      case 'many-to-many': {
        if (options.join === true) {
          JoinTable()(t, p);
        }
        break;
      }
    }
  };
}
