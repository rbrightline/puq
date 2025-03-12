import { isDefinedOrThrow } from '../required/is-defined-or-throw.js';

/**
 * A utility class to simplify switch-case workflows in a fluent, chainable manner.
 * The `Switch` class allows checking a value against multiple cases, executing
 * corresponding handlers when a match is found, and refining the type of the
 * value as cases are excluded.
 *
 * @template T - The type of the value being switched on.
 *
 * @example
 * // Basic usage
 * Switch.switchValue(42)
 *   .inCaseOf(42, () => console.log("Matched 42"))
 *   .inCaseOf(50, () => console.log("Matched 50"), () => console.log("Not 50"));
 * // Output: "Matched 42"
 *
 * @example
 * // Type narrowing
 * type Status = 'active' | 'inactive' | 'pending';
 * const status: Status = 'active';
 * Switch.switchValue(status)
 *   .inCaseOf('active', () => console.log("Active"))
 *   .inCaseOf('inactive', () => console.log("Inactive"));
 * // Output: "Active"
 */
export class Switch<T> {
  /**
   * Private constructor to initialize the switch value.
   *
   * @param {T} value - The value to switch on.
   */
  private constructor(private readonly value: T) {}

  /**
   * Static method to initiate a new `Switch` workflow with a value.
   * Throws an error if the value is not defined (e.g., `null` or `undefined`).
   *
   * @template T - The type of the value being switched on.
   * @param {T} switchValue - The value to start the switch workflow with.
   * @returns {Switch<T>} A new `Switch` instance for chaining.
   * @throws {Error} If `switchValue` is not defined (via `isDefinedOrThrow`).
   */
  public static switchValue<T>(switchValue: T): Switch<T> {
    isDefinedOrThrow(switchValue);
    return new Switch<T>(switchValue);
  }

  /**
   * Checks if the stored value matches the provided case value.
   * Executes the `pass` handler if they match, or the optional `fail` handler if they don't.
   * Narrows the type of the `Switch` instance by excluding the matched type from `T`.
   *
   * @template P - A sub type of `T` representing the case value's type.
   * @param {P} value - The case value to compare against the stored value.
   * @param {(value?: P) => void} pass - Callback executed if the stored value equals the case value.
   * @param {(value?: P) => void} [fail] - Optional callback executed if the stored value does not equal the case value.
   * @returns {Switch<Exclude<T, P>>} The current `Switch` instance with a narrowed type for chaining.
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
