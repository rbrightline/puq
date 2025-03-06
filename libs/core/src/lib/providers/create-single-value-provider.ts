import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';

export type SingleValueProviderResult<T> = {
  /**
   * Get provider token
   * @returns - symbol
   */
  token: () => symbol;
  /**
   * Provide value
   * @returns - symbol
   */
  provide: (value: T) => Provider;
  /**
   * Inject value
   * @returns - symbol
   */
  inject: () => ParameterDecorator;
};

export function createSingleValueProvider<T>(
  name: string,
): SingleValueProviderResult<T> {
  const token = (): symbol => Symbol(`${name}_TOKEN`);

  const provide = (useValue: T): Provider => {
    return {
      provide: token(),
      useValue: useValue,
    };
  };

  const inject =
    (): ParameterDecorator =>
    (...args: ParameterDecoratorParam) =>
      Inject(token())(...args);

  return {
    token,
    provide,
    inject,
  };
}
