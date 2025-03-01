export type ValidationConstraints = {
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  isString?: string;
  isNumber?: string;
  isInt?: string;
  isBoolean?: string;
  isObject?: string;
  isArray?: string;
  arrayMinSize?: string;
  arrayMaxSize?: string;
};

export type SingleValidationError = {
  property?: string;
  constraints?: ValidationConstraints;
};

export type ValidationErrorResult = {
  errors?: SingleValidationError[];
};
