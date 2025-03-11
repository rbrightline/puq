import type {
  Type,
  ValidationPipeOptions} from '@nestjs/common';
import {
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common';

export function globalValidationPipeOptions(
  expectedType?: () => Type,
): ValidationPipeOptions {
  return {
    expectedType: expectedType?.(),
    transform: true,
    stopAtFirstError: true,
    transformOptions: {
      exposeUnsetFields: false,
    },
    validationError: {
      target: false,
      value: false,
    },
    exceptionFactory(errors) {
      throw new UnprocessableEntityException({ errors });
    },
  };
}
/**
 * Validation pipe that activate transform, hide target and value, and restructure errors
 */
export const GlobalValidationPipe = new ValidationPipe({
  ...globalValidationPipeOptions(),
});
