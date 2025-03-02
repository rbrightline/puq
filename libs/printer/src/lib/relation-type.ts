import type { RelationOptions } from '@puq/type';
import { rval } from '@puq/is';
import { throwInvalidFieldError } from '@puq/error';

/**
 * Determines the relation type string based on the provided options.
 *
 * @param {RelationOptions} options - The relation options containing type and target.
 * @returns {string} A string representation of the relation type.
 */
export function relationType(options: RelationOptions): string {
  rval(options);
  rval(options.type);
  rval(options.target);

  switch (options.type) {
    case 'many-to-one':
    case 'one-to-one':
      return options.target.toString();
    case 'many-to-many':
    case 'one-to-many':
      return options.target.toString() + '[]';
    default:
      throwInvalidFieldError(
        `${options.type} is should be one of 'many-to-one', 'one-to-one', 'many-to-many', 'one-to-many'`,
      );
  }
}
