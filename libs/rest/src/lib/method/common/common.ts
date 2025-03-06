import type { MethodDecoratorParam } from '@puq/type';
import type { ApiOperationOptions } from '@nestjs/swagger';
import {
  ApiInternalServerErrorResponse as Internal,
  ApiUnauthorizedResponse as Unauthorized,
  ApiUnprocessableEntityResponse as InvalidInput,
  ApiOperation as Operation,
  ApiRequestTimeoutResponse as Timeout,
} from '@nestjs/swagger';
import { ValidationErrorDto as ErrorDto } from '@puq/orm';

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
    Operation({ summary: 'Operation summary is not set', ...options })(...args);
    Internal({ description: 'Internal server error' })(...args);
    Unauthorized({ description: 'Unauthorized access' })(...args);
    InvalidInput({ type: ErrorDto, description: 'Input validation error' })(
      ...args,
    );
    Timeout({ description: 'Request is taking longer than expected' })(...args);
  };
}
