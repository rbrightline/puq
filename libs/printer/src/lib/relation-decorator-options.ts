import { PropertyOptions, RelationOptions } from '@puq/type';

/**
 * Print property options (JSON.stringify)
 * @param options {@link PropertyOptions}
 * @returns
 */
export function relationDecoratorOptions(options: RelationOptions): string {
  const { name, ...rest } = options;
  const rOptions = { ...rest, target: `()=> ${options.target.toString()}` };
  return JSON.stringify(rOptions).replace(
    '"()=> ${options.target.toString()}"',
    '()=> ${options.target.toString()}'
  );
}
