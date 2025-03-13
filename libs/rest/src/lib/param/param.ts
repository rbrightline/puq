import { Param as __Param, ValidationPipe } from '@nestjs/common';
import { globalValidationPipeOptions } from '@puq/middleware';
import type { ParameterDecoratorParam, Type } from '@puq/type';

/**
 * URL param
 * @returns
 */
export function Param(expectedType?: () => Type): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    if (expectedType) {
      __Param(new ValidationPipe(globalValidationPipeOptions(expectedType)))(
        ...args,
      );
    } else {
      __Param()(...args);
    }
  };
}
