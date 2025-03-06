import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';

export type GroupValueProviderResult<T> = {
  /**
   * get the value provider token
   * @param name - resource name
   * @returns - symbol
   */
  token: (name: string) => symbol;

  /**
   * Provide value by name
   * @param name - resource name
   * @param value - value to provide
   * @returns - provider
   */
  provide: (name: string, value: T) => Provider;

  /**
   * Inject value by name
   * @param name - resource name
   * @returns - parameter decorator
   */
  inject: (name: string) => ParameterDecorator;
};

export function createGroupValueProvider<T>(
  group: string,
): GroupValueProviderResult<T> {
  const token = (name: string): symbol => Symbol(`${name}_${group}_TOKEN`);

  const provide = (name: string, useValue: T): Provider => {
    return {
      provide: token(name),
      useValue: useValue,
    };
  };

  const inject =
    (name: string): ParameterDecorator =>
    (...args: ParameterDecoratorParam) =>
      Inject(token(name))(...args);

  return {
    token,
    provide,
    inject,
  };
}
