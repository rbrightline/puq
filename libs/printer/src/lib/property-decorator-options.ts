import { omit } from '@puq/is';
import type { PropertyOptions } from '@puq/type';

/**
 * Serializes property decorator options to a JSON-CODE string with special handling for target properties
 * @param options - {@link PropertyOptions}
 * @returns - {@link string} JSON string
 */
export function propertyDecoratorOptions(options: PropertyOptions): string {
  return replaceTargetWithFunction(
    JSON.stringify(omit(options, ['name'])),
    getTargetString(options),
  );
}

/**
 * Extracts target string from options based on type
 * @param options Property options to inspect
 * @returns Target string if applicable, undefined otherwise
 */
function getTargetString(options: PropertyOptions): string {
  if (options.type === 'object') {
    return options.target?.toString();
  }

  if (options.type === 'array' && options.items.type === 'object') {
    return options.items.target.toString();
  }

  return '';
}

/**
 * Replaces target option string with factory function
 * @param json Original JSON string
 * @param target - {@link string} target option in {@link PropertyOptions}
 * @returns - {@link string} JSON string
 */
function replaceTargetWithFunction(json: string, target: string): string {
  const searchPattern = `"target":"${target}"`;
  const replacement = `"target":()=>${target}`;
  return json.replace(searchPattern, replacement);
}
