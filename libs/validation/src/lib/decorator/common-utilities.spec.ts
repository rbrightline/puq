import { Exclude } from 'class-transformer';
import { PropertyValidation } from './property.js';

/**
 * Compare the validation errors with the found errors
 * This method is for testing purposes,
 * @ignore
 * @param expectedErrors
 * @param foundErrors
 */
export function __assertErrors(
  expectedErrors: string[],
  foundErrors: string[]
) {
  if (expectedErrors.length > 0) {
    expect(foundErrors).toHaveLength(expectedErrors.length);

    for (const e of foundErrors) {
      expect(expectedErrors).include(e);
    }

    for (const e of expectedErrors) {
      expect(foundErrors).include(e);
    }
  } else {
    if (foundErrors.length > 0) console.error(foundErrors);

    expect(foundErrors.length).toEqual(0);
  }
}

@Exclude()
export class TestObj {
  @PropertyValidation({ type: 'string' })
  value: string;
}

describe('common utilities', () => {
  it('common utilities', () => {
    expect(1).toEqual(1);
  });
});
