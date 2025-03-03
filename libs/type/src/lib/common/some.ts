/**
 * The type is desigend for guard functions
 * 
 * ```ts
 * function<T>requiredValue(value:Some<T>):T {
 *   if(type of value ==='string') return value;
 *   throw Error(`${value} is not a typeof string`)
 * }
 * ```
 * 
 * The function in the example accept all types of intput but only returns the T type, throw otherwise
 
 */
export type Some<T = unknown> = T | unknown;
