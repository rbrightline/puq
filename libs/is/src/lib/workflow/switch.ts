import { isDefinedOrThrow } from '../required/is-defined-or-throw.js';

/**
 * Workflow class to simplify switch-case work-flow
 */
export class Switch<T> {
  private constructor(private readonly value: T) {}

  /**
   * Start the switch statement
   * @param switchValue - value to check
   * @returns this
   */
  public static switchValue<T>(switchValue: T): Switch<T> {
    isDefinedOrThrow(switchValue);
    return new Switch<T>(switchValue);
  }

  /**
   * Check the `value` is equal to the source value or not and run the `pass` or `fail` functions accordingly
   * @param value - case value
   * @param pass - run when the case value is equal to the source value
   * @param fail - run when the case value is not equal to the source value
   * @returns - this
   */
  inCaseOf<P extends T>(
    value: P,
    pass: (value?: P) => void,
    fail?: (value?: P) => void,
  ): Switch<Exclude<T, P>> {
    if (value === this.value) {
      pass(value);
    } else {
      fail?.(value);
    }
    return this as Switch<Exclude<T, P>>;
  }
}
