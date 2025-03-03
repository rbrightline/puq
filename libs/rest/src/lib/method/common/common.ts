/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiInternalServerErrorResponse as Internal,
  ApiUnauthorizedResponse as Unauthorized,
  ApiUnprocessableEntityResponse as InvalidInput,
} from '@nestjs/swagger';
import { ValidationErrorDto as ErrorDto } from '@puq/orm';

/**
 * Common decorators for all method decorators
 * @returns - {@link MethodDecorator}
 */
export function CommonMethod(): MethodDecorator {
  return (...args: [any, any, any]) => {
    Internal()(...args);
    Unauthorized()(...args);
    InvalidInput({ type: ErrorDto })(...args);
  };
}
