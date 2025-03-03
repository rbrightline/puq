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
  iarr,
  istr,
  inum,
  ibool,
  iobj,
  ibint,
  isym,
  ifunc,
} from '../type/itype.js';
import { Some } from '@puq/type';

/**
 * check the type of value is `string`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 * @throws - {@link throwInvalidStringError}
 */
export function rstr<T extends string>(value: Some<T>): T {
  if (istr(value)) return value as T;
  throwInvalidStringError();
}

/**
 * check the type of value is `number`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */

export function rnum(value: unknown): number {
  if (inum(value)) return value;
  throwInvalidNumberError();
}

/**
 * check the type of value is `boolean`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function rbool(value: unknown): boolean {
  if (ibool(value)) return value;
  throwInvalidBooleanError();
}

/**
 * check the type of value is `object`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function robj(value: unknown): object {
  if (iobj(value)) return value;
  throwInvalidObjectError();
}

/**
 * check the type of value is `bigint`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function rbint(value: unknown): bigint {
  if (ibint(value)) return value;
  throwInvalidNumberError();
}

/**
 * check the type of value is `symbol`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function rsym(value: unknown): symbol {
  if (isym(value)) return value;
  throwInvalidStringError();
}

export type RfuncReturn = (...args: unknown[]) => unknown;
/**
 * check the type of value is `function`. And return `true` or `false`
 * @param value unkown value
 * @returns boolean
 */
export function rfunc(value: unknown): RfuncReturn {
  if (ifunc(value)) return value;
  throwInvalidFieldError();
}

/**
 * Check the value is `value is Array<T>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `value is Array<T>`, or false
 */
export function rarr<T>(value: unknown): value is Array<T> {
  if (Array.isArray(value)) return true;
  throwInvalidArrayError();
}

/**
 * Check the value is `Array<string>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<string>`, or false
 */
export function rstrs(value: unknown): value is Array<string> {
  if (iarr<string>(value) && value.every(istr)) return true;
  throwInvalidArrayStringError();
}

/**
 * Check the value is `Array<number>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<number>`, or false
 */
export function rnums(value: unknown): value is Array<number> {
  if (iarr(value) && value.every(inum)) return true;
  throwInvalidArrayNumberError();
}

/**
 * Check the value is `Array<boolean>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<boolean>`, or false
 */
export function rbools(value: unknown): value is Array<boolean> {
  if (iarr(value) && value.every(ibool)) return true;
  throwInvalidArrayBooleanError();
}

/**
 * Check the value is `unknown): value is Array<T>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `unknown): value is Array<T>`, or false
 */

export function robjs<T extends object>(value: unknown): value is Array<T> {
  if (iarr(value) && value.every(iobj)) return true;
  throwInvalidArrayObjectError();
}
/**
 * Check the value is `Array<bigint>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<bigint>`, or false
 */

export function rbints(value: unknown): value is Array<bigint> {
  if (iarr(value) && value.every(ibint)) return true;
  throwInvalidArrayNumberError();
}

/**
 * Check the value is `Array<symbol>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<symbol>`, or false
 */
export function rsyms(value: unknown): value is Array<symbol> {
  if (iarr<symbol>(value) && value.every(isym)) return true;
  throwInvalidArrayStringError();
}

export type RfuncsReturn = Array<(...args: unknown[]) => unknown>;
/**
 * Check the value is `Array<(...args: unknown[]) => unknown>`
 * @param value unkown value
 * @returns return `true` if the value is the type of `Array<(...args: unknown[]) => unknown>`, or false
 */
export function rfuncs(value: unknown): value is RfuncsReturn {
  if (iarr<symbol>(value) && value.every(ifunc)) return true;
  throwInvalidParameterError();
}
