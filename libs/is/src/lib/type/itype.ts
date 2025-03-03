/**
 * check the type of value is `string`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function istr(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * check the type of value is `number`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function inum(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * check the type of value is `boolean`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function ibool(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * check the type of value is `object`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function iobj(value: unknown): value is object {
  return typeof value === 'object';
}

/**
 * check the type of value is `bigint`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function ibint(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

/**
 * check the type of value is `symbol`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function isym(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * check the type of value is `function`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function ifunc(
  value: unknown,
): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Check the value is `value is Array<T>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `value is Array<T>`, or false
 */
export function iarr<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}
/**
 * Check the value is `Array<string>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<string>`, or false
 */
export function istrs(value: unknown): value is Array<string> {
  return iarr<string>(value) && value.every(istr);
}
/**
 * Check the value is `Array<number>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<number>`, or false
 */
export function inums(value: unknown): value is Array<number> {
  return iarr(value) && value.every(inum);
}
/**
 * Check the value is `Array<boolean>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<boolean>`, or false
 */
export function ibools(value: unknown): value is Array<boolean> {
  return iarr(value) && value.every(ibool);
}
/**
 * Check the value is `unknown): value is Array<T>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `unknown): value is Array<T>`, or false
 */
export function iobjs<T extends object>(value: unknown): value is Array<T> {
  return iarr(value) && value.every(iobj);
}
/**
 * Check the value is `Array<bigint>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<bigint>`, or false
 */
export function ibints(value: unknown): value is Array<bigint> {
  return iarr(value) && value.every(ibint);
}

/**
 * Check the value is `Array<symbol>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<symbol>`, or false
 */
export function isyms(value: unknown): value is Array<symbol> {
  return iarr<symbol>(value) && value.every(isym);
}

/**
 * Check the value is `Array<(...args: unknown[]) => unknown>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<(...args: unknown[]) => unknown>`, or false
 */
export function ifuncs(
  value: unknown,
): value is Array<(...args: unknown[]) => unknown> {
  return iarr<symbol>(value) && value.every(ifunc);
}
