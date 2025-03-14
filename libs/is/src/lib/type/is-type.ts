/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Some, SomeRecord } from '@puq/type';

/**
 * Check the type of value is `string`
 * @param value - {@link Some<string>} value
 * @returns - {@link boolean}
 */
export function isString(value: Some<string>): value is string {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Check the type of value is `number`
 * @param value - {@link Some<number>} value
 * @returns - {@link boolean}
 */
export function isNumber(value: Some<number>): value is number {
  return typeof value === 'number' || value instanceof Number;
}

/**
 * Check the type of value is `boolean`
 * @param value - {@link Some<boolean>} value
 * @returns - {@link boolean}
 */
export function isBoolean(value: Some<boolean>): value is boolean {
  return typeof value === 'boolean' || value instanceof Boolean;
}

/**
 * Check the type of value is `object`
 * @param value - {@link Some<object>} value
 * @returns - {@link boolean}
 */
export function isObject(value: Some<SomeRecord>): value is object {
  return (
    typeof value === 'object' &&
    !(
      value instanceof String ||
      value instanceof Number ||
      value instanceof BigInt ||
      value instanceof Boolean
    )
  );
}

/**
 * Check the type of value is `bigint`
 * @param value - {@link Some<bigint>} value
 * @returns - {@link boolean}
 */
export function isBigint(value: Some<bigint>): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Check the type of value is `symbol`
 * @param value - {@link Some<symbol>} value
 * @returns - {@link boolean}
 */
export function isSymbol(value: Some<symbol>): value is symbol {
  return typeof value === 'symbol';
}

/**
 * Check the type of value is `function`
 * @param value - {@link Some<T>} value
 * @returns - {@link boolean}
 */
export function isFunction<T extends Function>(value: Some<T>): value is T {
  return typeof value === 'function';
}

/**
 * Check the type of value is `value`
 * @template - {@link T} Array's item type
 * @param value - {@link Some<T>} value
 * @returns - {@link boolean}
 */
export function isArray<T>(value: Some<T>): value is Array<T> {
  return Array.isArray(value);
}
/**
 * Check the type of value is `Array<string>`
 * @param value - {@link Some<Array<string>>} value
 * @returns - {@link boolean}
 */
export function isArrayString(
  value: Some<Array<string>>,
): value is Array<string> {
  return isArray<string>(value) && value.every(isString);
}
/**
 * Check the type of value is `value`
 * @param value - {@link  Some<Array<number>>} value
 * @returns - {@link boolean}
 */
export function isArrayNumber(
  value: Some<Array<number>>,
): value is Array<number> {
  return isArray(value) && value.every(isNumber);
}
/**
 * Check the type of value is `value`
 * @param value - {@link Some<Array<boolean>>} value
 * @returns - {@link boolean}
 */
export function isArrayBoolean(
  value: Some<Array<boolean>>,
): value is Array<boolean> {
  return isArray(value) && value.every(isBoolean);
}
/**
 * Check the type of value is    value: unknown`  value: unknown,`
 * @param value - {@link Some<Array<SomeRecord>>} value
 * @returns - {@link boolean}
 */
export function isArrayObject<T extends SomeRecord>(
  value: Some<Array<SomeRecord>>,
): value is Array<T> {
  return isArray(value) && value.every(isObject);
}
/**
 * Check the type of value is `value`
 * @param value - {@link Some<Array<bigint>>} value
 * @returns - {@link boolean}
 */
export function isArrayBigint(
  value: Some<Array<bigint>>,
): value is Array<bigint> {
  return isArray(value) && value.every(isBigint);
}

/**
 * Check the type of value is `value`
 * @param value - {@link Some<Array<symbol>>} value
 * @returns - {@link boolean}
 */
export function isArraySymbol(
  value: Some<Array<symbol>>,
): value is Array<symbol> {
  return isArray<symbol>(value) && value.every(isSymbol);
}

/**
 * Check the type of value is    value: unknown`  value: unknown,`
 * @param value - {@link Some<Array<Function>>} value
 * @returns - {@link boolean}
 */
export function isArrayFunction(
  value: Some<Array<Function>>,
): value is Array<(...args: unknown[]) => unknown> {
  return isArray<symbol>(value) && value.every(isFunction);
}

export function isPrimitive<T>(value: Some<T>): value is T {
  if (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isBigint(value)
  ) {
    return true;
  }

  return false;
}
