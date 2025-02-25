import { PropertyOptions } from '@puq/type';

/**
 * Serializes property decorator options to a JSON-CODE string with special handling for target properties
 * @param options Property decorator configuration
 * @returns Formatted JSON string with function notation for targets
 */
export function propertyDecoratorOptions(options: PropertyOptions): string {
  // Destructure options, excluding 'name'
  const { name, ...restOptions } = options;

  // Convert remaining options to JSON string
  let optionsString = JSON.stringify(restOptions);

  // Handle target conversion for specific types
  const target = getTargetString(options);

  if (target) return replaceTargetWithFunction(optionsString, target);

  return optionsString;
}

/**
 * Extracts target string from options based on type
 * @param options Property options to inspect
 * @returns Target string if applicable, undefined otherwise
 */
function getTargetString(options: PropertyOptions): string | undefined {
  if (options.type === 'object') {
    return options.target?.toString();
  }

  if (options.type === 'array' && options.items.type === 'object') {
    return options.items.target.toString();
  }

  return undefined;
}

/**
 * Replaces target string with function notation in JSON
 * @param json Original JSON string
 * @param target Target string to replace
 * @returns Modified JSON string
 */
function replaceTargetWithFunction(json: string, target: string): string {
  const searchPattern = `"target":"${target}"`;
  const replacement = `"target":()=>${target}`;
  return json.replace(searchPattern, replacement);
}
