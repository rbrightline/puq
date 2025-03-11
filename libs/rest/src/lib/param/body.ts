import { Body as __Body, ValidationPipe } from '@nestjs/common';
import { globalValidationPipeOptions } from '@puq/middleware';
import type { ParameterDecoratorParam, Type } from '@puq/type';

/**
 * Body param
 * @param expectedType
 * @returns
 */
export function Body(expectedType?: () => Type): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    __Body(new ValidationPipe(globalValidationPipeOptions(expectedType)))(
      ...args,
    );
  };
}
