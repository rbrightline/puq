import { PropertyOptions } from '@puq/type';

/**
 * Determines if a property is optional based on its required status
 * @param options Configuration object containing required property
 * @returns '' if required, '?' if optional
 */
export function getOptionalMarker<T extends Pick<PropertyOptions, 'required'>>(
  options: T
): '' | '?' {
  return options.required === true ? '' : '?';
}
