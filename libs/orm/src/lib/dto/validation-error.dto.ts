import type {
  SingleValidationError,
  ValidationConstraints,
  ValidationErrorResult,
} from '@puq/type';
import { Dto, Property } from '@puq/property';
import { HttpErrorDto } from './http-error.dto.js';

@Dto()
export class ValidationConstraintsDto implements ValidationConstraints {
  @Property({ type: 'string' }) min?: string;
  @Property({ type: 'string' }) max?: string;
  @Property({ type: 'string' }) minLength?: string;
  @Property({ type: 'string' }) maxLength?: string;
  @Property({ type: 'string' }) isString?: string;
  @Property({ type: 'string' }) isNumber?: string;
  @Property({ type: 'string' }) isInt?: string;
  @Property({ type: 'string' }) isBoolean?: string;
  @Property({ type: 'string' }) isObject?: string;
  @Property({ type: 'string' }) isArray?: string;
  @Property({ type: 'string' }) arrayMinSize?: string;
  @Property({ type: 'string' }) arrayMaxSize?: string;
}

@Dto()
export class SingleValidationErrorDto implements SingleValidationError {
  @Property({ type: 'string' }) property?: string;
  @Property({ type: 'object', target: () => ValidationConstraintsDto })
  constraints?: ValidationConstraintsDto;
}

@Dto()
export class ValidationErrorDto
  extends HttpErrorDto
  implements ValidationErrorResult
{
  @Property({
    type: 'array',
    items: { type: 'object', target: () => SingleValidationErrorDto },
  })
  errors?: SingleValidationErrorDto[];
}
