import { createParamDecorator } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';

/**
 * Extract user id from request
 * @returns - parameter decorator
 */
export function UserId(): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    createParamDecorator((data, context) => {
      return context.switchToHttp().getRequest().userId;
    })(...args);
  };
}
