import type { SomeRecord, Type } from '@puq/type';
import assert from 'assert';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { extractConstraints } from './extract-constraints.js';

/**
 * Transform and validate value by instance. And check the `expectedErrors` matches with the `actualErrors`
 * @param targetClass - target class
 * @param targetValue - target value
 * @param expectedErrors - list of constraints to be expected
 */
export async function transformAndValidate<T>(
  targetClass: Type,
  targetValue: SomeRecord<T>,
  expectedErrors: string[],
) {
  const instance = plainToInstance(targetClass, targetValue);
  const validationErrors = await validate(instance as object);

  const constraints = extractConstraints(validationErrors);

  if (expectedErrors.length > 0) {
    assert.equal(constraints.length, expectedErrors.length);

    for (const e of constraints) {
      assert.ok(expectedErrors.includes(e));
    }

    for (const e of expectedErrors) {
      assert.ok(constraints.includes(e));
    }
  } else {
    if (constraints.length > 0) console.error(constraints);
    assert.equal(constraints.length, 0);
  }
}
