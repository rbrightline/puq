/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
export type PropertyDecoratorParam = [Object, string | symbol];

export type ClassDecoratorParam = [Function];

export type MethodDecoratorParam<T> = [
  Object,
  string | symbol,
  TypedPropertyDescriptor<T>,
];

export type ParameterDecoratorParam = [
  Object,
  string | symbol | undefined,
  number,
];
