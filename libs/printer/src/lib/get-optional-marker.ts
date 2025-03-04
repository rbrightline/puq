import type { PropertyOptions } from '@puq/type';

export type OptionalOrRequiredMark = '' | '?';

/**
 * Return optional mark for optional property or empty string
 * @param options - {@link PropertyOptions}
 * @returns - {@link OptionalOrRequiredMark }
 */
export function getOptionalMarker<T extends Pick<PropertyOptions, 'required'>>(
  options: T,
): OptionalOrRequiredMark {
  return options.required === true ? '' : '?';
}
