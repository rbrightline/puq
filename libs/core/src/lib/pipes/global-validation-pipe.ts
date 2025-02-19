import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
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
});
