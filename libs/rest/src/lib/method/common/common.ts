import type { MethodDecoratorParam } from '@puq/type';
import type { ApiOperationOptions } from '@nestjs/swagger';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { ValidationErrorDto } from '@puq/orm';

export type CommonMethodOptions = {
  summary?: string;
  description?: string;
};
/**
 * Common decorators for all method decorators
 * @returns - {@link MethodDecorator}
 */
export function CommonMethod(options?: ApiOperationOptions): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    options = options ?? {};
    ApiOperation({ summary: 'Operation summary is not set', ...options })(
      ...args,
    );
    ApiInternalServerErrorResponse({ description: 'Internal server error' })(
      ...args,
    );
    ApiUnauthorizedResponse({ description: 'Unauthorized access' })(...args);
    ApiUnprocessableEntityResponse({
      type: ValidationErrorDto,
      description: 'Input validation error',
    })(...args);
    ApiRequestTimeoutResponse({
      description: 'Request is taking longer than expected',
    })(...args);
  };
}
