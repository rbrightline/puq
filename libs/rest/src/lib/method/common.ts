/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiInternalServerErrorResponse as __Internal,
  ApiUnauthorizedResponse as __Unauthorized,
  ApiUnprocessableEntityResponse as __Invalid,
} from '@nestjs/swagger';
import { ValidationErrorDto } from '@puq/orm';

/**
 * Common api request responses
 * @returns
 */
export function CommonMethod(): MethodDecorator {
  return (...args: [any, any, any]) => {
    __Internal({ description: 'Internal server error' })(...args);
    __Unauthorized({ description: 'Unauthorized request' })(...args);
    __Invalid({
      type: ValidationErrorDto,
      description: 'Invalid input',
    })(...args);
  };
}
