import { ApiInternalServerErrorResponse as __InternalError } from '@nestjs/swagger';

export function CommonMethod(): MethodDecorator {
  return (...args: [any, any, any]) => {
    __InternalError({ description: 'Internal server error' })(...args);
  };
}
