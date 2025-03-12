/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  throwInvalidStringError,
  throwInvalidObjectError,
  throwInvalidNumberError,
  throwInvalidArrayNumberError,
  throwInvalidArrayStringError,
  throwInvalidParameterError,
  throwInvalidArrayObjectError,
  throwInvalidArrayBooleanError,
  throwInvalidArrayError,
  throwInvalidFieldError,
  throwInvalidBooleanError,
} from '@puq/error';
import {
  isArray,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isBigint,
  isSymbol,
  isFunction,
} from '../type/is-type.js';
import type { Some } from '@puq/type';

/**
 * Check the type of value is `string`. And return `true` or `false`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link T }
 * @throws - {@link throwInvalidStringError}
 */
export function isStringOrThrow<T extends string>(value: Some<T>): T {
  if (isString(value)) return value as T;
  throwInvalidStringError();
}

/**
 * Check the type of value is number, and return it, else throw error
 * @param value - unknown value
 * @returns - `value`
 * @throws - error via `throwInvalidNumberError`
 */

export function isNumberOrThrow(value: unknown): number {
  if (isNumber(value)) return value;
  throwInvalidNumberError();
}

/**
 * check the type of value is `boolean`. And return `true` or `false`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link boolean}
 * @throws - {@link throwInvalidBooleanError}
 */
export function isBooleanOrThrow(value: unknown): boolean {
  if (isBoolean(value)) return value;
  throwInvalidBooleanError();
}

/**
 * check the type of value is `object`. And return `true` or `false`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link object}
 * @throws - {@link throwInvalidObjectError}
 */
export function isObjectOrThrow(value: unknown): object {
  if (isObject(value)) return value;
  throwInvalidObjectError();
}

/**
 * check the type of value is `bigint`. And return `true` or `false`
 * @template - {@link T} expthrowInvalidObjectErrorected value
 * @param value - {@link Some<T>} value
 * @returns - {@link bigint}
 * @throws - {@link throwInvalidNumberError}
 */
export function isBigintOrThrow(value: unknown): bigint {
  if (isBigint(value)) return value;
  throwInvalidNumberError();
}

/**
 * Check the type of value is `symbol`. And return `true` or `false`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link symbol}
 * @throws - {@link throwInvalidParameterError}
 */
export function isSymbolOrThrow(value: unknown): symbol {
  if (isSymbol(value)) return value;
  throwInvalidParameterError();
}

/**
 * check the type of value is `function`. And return `true` or `false`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Function}
 * @throws - {@link throwInvalidFieldError}
 */
export function isFunctionOrThrow(value: Some<Function>): Function {
  if (isFunction(value)) return value;
  throwInvalidFieldError();
}

/**
 * Check the value is {@link Array<T>}
 * @template - {@link T} expected value
 * @param value - {@link Some<Array<T>>} value
 * @returns - {@link Array<T>}
 * @throws - {@link throwInvalidArrayError}
 *
 */
export function isArrayOrThrow<T>(value: Some<Array<T>>): value is Array<T> {
  if (Array.isArray(value)) return true;
  throwInvalidArrayError();
}

/**
 * Check the value is `Array<string>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<string>}
 * @throws - {@link throwInvalidArrayStringError}
 */
export function isArrayStringOrThrow(
  value: Some<Array<string>>,
): value is Array<string> {
  if (isArray<string>(value) && value.every(isString)) return true;
  throwInvalidArrayStringError();
}

/**
 * Check the value is `Array<number>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<number>}
 * @throws - {@link throwInvalidArrayNumberError}
 */
export function isArrayNumberOrThrow(
  value: Some<Array<number>>,
): value is Array<number> {
  if (isArray(value) && value.every(isNumber)) return true;
  throwInvalidArrayNumberError();
}

/**
 * Check the value is `Array<boolean>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<boolean> }
 * @throws - {@link throwInvalidArrayBooleanError}
 */
export function isArrayBooleanOrThrow(
  value: Some<Array<boolean>>,
): value is Array<boolean> {
  if (isArray(value) && value.every(isBoolean)) return true;
  throwInvalidArrayBooleanError();
}

/**
 * Check the value is `unknown): value is Array<T>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<T>}
 * @throws - {@link throwInvalidArrayObjectError}
 */
export function isArrayObjectOrThrow<T extends object>(
  value: Some<Array<T>>,
): value is Array<T> {
  if (isArray(value) && value.every(isObject)) return true;
  throwInvalidArrayObjectError();
}

/**
 * Check the value is `Array<bigint>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<bigint>}
 * @throws - {@link throwInvalidArrayNumberError}
 */
export function isArrayBigintOrThrow(
  value: Some<Array<bigint>>,
): value is Array<bigint> {
  if (isArray(value) && value.every(isBigint)) return true;
  throwInvalidArrayNumberError();
}

/**
 * Check the value is `Array<symbol>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<symbol>}
 * @throws - {@link throwInvalidParameterError}
 */
export function isArraySymbolOrThrow(
  value: Some<Array<symbol>>,
): value is Array<symbol> {
  if (isArray<symbol>(value) && value.every(isSymbol)) return true;
  throwInvalidParameterError();
}

/**
 * Check the value is `Array<(...args: unknown[]) => unknown>`
 * @template - {@link T} expected value
 * @param value - {@link Some<T>} value
 * @returns - {@link Array<Function> }
 * @throws - {@link throwInvalidParameterError}
 */
export function isArrayFunctionOrThrow(
  value: Some<Array<Function>>,
): value is Array<Function> {
  if (isArray<symbol>(value) && value.every(isFunction)) return true;
  throwInvalidParameterError();
}
