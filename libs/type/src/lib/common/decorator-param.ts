/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * Decorator param `(...args:PropertyDecoratorParam)=>`
 */
export type PropertyDecoratorParam = [object, string | symbol];

/**
 * Decorator param `(...args:ClassDecoratorParam)=>`
 */
export type ClassDecoratorParam = [Function];

/**
 * Decorator param `(...args:MethodDecoratorParam)=>`
 */
export type MethodDecoratorParam<T> = [
  object,
  string | symbol,
  TypedPropertyDescriptor<T>,
];

/**
 * Decorator param `(...args:ParameterDecoratorParam)=>`
 */
export type ParameterDecoratorParam = [
  object,
  string | symbol | undefined,
  number,
];

export type ConstructorDecoratorParam = [Function, undefined, number];
