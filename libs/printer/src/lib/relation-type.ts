import { rval } from '@puq/is';
import { RelationOptions } from '@puq/type';

/**
 * Print property type such as 'string', 'number', 'stirng[]', 'SomeObject[]'
 * @param options
 * @returns
 */
export function relationType(options: RelationOptions): string {
  rval(options);
  switch (options.type) {
    case 'many-to-one':
    case 'one-to-one':
      return options.target.toString();
    case 'many-to-many':
    case 'one-to-many':
      return options.target.toString() + '[]';
  }
}
