import { PropertyOptions } from '@puq/type';

/**
 * If property is required, return "" else "?";
 * @param options
 * @returns
 */
export function isRequired<T extends Pick<PropertyOptions, 'required'>>(
  options: T
): '?' | '' {
  return options.required === true ? '' : '?';
}
