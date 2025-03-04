import type { RelationOptions } from '@puq/type';
import { isDefinedOrThrow } from '@puq/is';
import { throwInvalidFieldError } from '@puq/error';

/**
 * Determine the actual typescript type for {@link RelationOptions}
 * @param options - {@link RelationOptions}
 * @returns - {@link string}
 */
export function relationType(options: RelationOptions): string {
  isDefinedOrThrow(options);
  isDefinedOrThrow(options.type);
  isDefinedOrThrow(options.target);

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
