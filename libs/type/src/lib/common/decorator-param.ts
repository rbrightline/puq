/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */

/**
 * Decorator param `(...args:PropertyDecoratorParam)=>`
 */
export type PropertyDecoratorParam = [Object, string | symbol];

/**
 * Decorator param `(...args:ClassDecoratorParam)=>`
 */
export type ClassDecoratorParam = [Function];

/**
 * Decorator param `(...args:MethodDecoratorParam)=>`
 */
export type MethodDecoratorParam<T> = [
  Object,
  string | symbol,
  TypedPropertyDescriptor<T>,
];

/**
 * Decorator param `(...args:ParameterDecoratorParam)=>`
 */
export type ParameterDecoratorParam = [
  Object,
  string | symbol | undefined,
  number,
];

export type ConstructorDecoratorParam = [Function, undefined, number];
