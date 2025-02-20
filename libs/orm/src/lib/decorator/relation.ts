import { Type } from '@puq/type';
import {
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationOptions as __RelationOptions,
} from 'typeorm';
import { RelationType } from 'typeorm/metadata/types/RelationTypes.js';

export type RelationOptions = __RelationOptions & { join?: boolean };

export function Relation(
  type: RelationType,
  target: () => Type,
  options: RelationOptions
): PropertyDecorator {
  return (t, p) => {
    switch (type) {
      case 'one-to-one':
        OneToOne(target, (e) => e.id, options)(t, p);
        break;
      case 'one-to-many':
        OneToMany(target, (e) => e.id, options)(t, p);
        break;
      case 'many-to-one':
        ManyToOne(target, (e) => e.id, options)(t, p);
        break;
      case 'many-to-many':
        ManyToMany(target, (e) => e.id, options)(t, p);
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
