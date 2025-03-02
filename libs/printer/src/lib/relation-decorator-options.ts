import type { RelationOptions } from '@puq/type';

/**
 * Converts relation options into a JSON-Code string for use in a decorator.
 *
 * @param {RelationOptions} options - The relation options, including name, type, and target.
 * @returns {string} A JSON string representation of the relation options, with `target` formatted as a function.
 */
export function relationDecoratorOptions(options: RelationOptions): string {
  // Destructure options, excluding 'name'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...restOptions } = options;

  // Convert remaining options to JSON string
  let result = JSON.stringify(restOptions);

  // Handle target conversion for specific types
  const target = getTargetString(options);

  result = replaceTargetWithFunction(result, target);

  return result;
}

/**
 * Extracts target string from options based on type
 * @param options Property options to inspect
 * @returns Target string if applicable, undefined otherwise
 */
function getTargetString(options: RelationOptions): string {
  return options.target.toString();
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
