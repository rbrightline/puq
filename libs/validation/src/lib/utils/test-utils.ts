import { PropertyOptions } from '@puq/type';
import { PropertyValidation } from '../decorator/property.js';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

/**
 * Extract the constraints from the list of {@link ValidationError[]}
 * @ignore
 * @param errors
 * @returns
 */
export function ___extractConstraints(errors?: ValidationError[]): string[] {
  const result: string[] = [];

  console.log(errors);
  if (errors && errors.length > 0) {
    errors.forEach((e) => {
      if (e.constraints) result.push(...Object.keys(e.constraints));

      if (e.children && e.children.length > 0)
        result.push(...___extractConstraints(e.children));
    });
  }

  return result;
}

export type TestClass = {
  value: any;
};

/**
 * Create, validate {@link SampleTestClass}, and return the found constraints.
 * @ignore
 * @param options
 * @param value
 * @returns
 */
export function __validateTestClass(
  options: PropertyOptions,
  value: any
): string[] {
  @Exclude()
  class SampleTestClass {
    @PropertyValidation(options)
    value: any;
  }
  const instance = plainToInstance(SampleTestClass, value);
  return ___extractConstraints(
    validateSync(instance, {
      stopAtFirstError: true,
      validationError: { target: false, value: false },
    })
  );
}
