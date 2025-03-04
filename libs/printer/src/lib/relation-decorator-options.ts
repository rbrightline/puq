import { omit } from '@puq/is';
import type { RelationOptions } from '@puq/type';

/**
 * Convert {@link RelationOptions} into JSON string
 * @param options - {@link RelationOptions}
 * @returns - {@link string} JSON string
 */
export function relationDecoratorOptions(options: RelationOptions): string {
  options = omit(options, ['name']);

  return replaceTargetWithFunction(
    JSON.stringify(options),
    getTargetClassName(options),
  );
}

/**
 * Return the relation's entity name
 * @param options - {@link RelationOptions}
 * @returns - {@link string } relation entity's name
 */
function getTargetClassName(options: RelationOptions): string {
  return options.target.toString();
}

/**
 * Replace target option in the {@link json} string with a factory function `()=>Target`
 * @param json - {@link string} json string
 * @param target-{@link string} current target option value in {@link json} string
 * @returns - {@link string} JSON string with updated target option
 */
function replaceTargetWithFunction(json: string, target: string): string {
  const searchPattern = `"target":"${target}"`;
  const replacement = `"target":()=>${target}`;
  return json.replace(searchPattern, replacement);
}
