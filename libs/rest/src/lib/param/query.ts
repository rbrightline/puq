import { Query as __Query, ValidationPipe } from '@nestjs/common';
import { globalValidationPipeOptions } from '@puq/middleware';
import type { ParameterDecoratorParam, Type } from '@puq/type';

/**
 * Query param
 * @param expectedType
 * @returns
 */
export function Query(expectedType?: () => Type): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    __Query(new ValidationPipe(globalValidationPipeOptions(expectedType)))(
      ...args,
    );
  };
}
