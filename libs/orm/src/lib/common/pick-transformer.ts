import { type PropertyOptions } from '@puq/type';
import type { ValueTransformer } from 'typeorm';

/**
 * Some databases does not support a certain data types such as sqlite does not suppor `array` type.
 * This function picks the `transformer` to make none-primitive data types compatible with the provided database driver
 * @param options property options {@link PropertyOptions}
 * @returns the {@link ValueTransformer}
 */
export function pickTransformer(
  options: PropertyOptions
): ValueTransformer | undefined {
  if (options.databaseType?.includes('sqlite')) {
    if (options.type === 'object' || options.type === 'array') {
      return {
        from(value) {
          if (value != undefined) return JSON.parse(value);
          return value;
        },
        to(value) {
          if (value != undefined) return JSON.stringify(value);

          return value;
        },
      };
    }
  }
  return undefined;
}
