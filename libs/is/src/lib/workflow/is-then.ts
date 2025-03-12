import type { Optional } from '@puq/type';
import { isDefined } from '../defined/is-defined.js';

/**
 * A utility class for conditional execution with method chaining.
 * Provides static and instance methods to handle defined values and boolean conditions,
 * executing provided handlers based on the condition, with optional fallback handlers.
 * Each method returns the `IsThen` instance for chaining.
 *
 * @example
 * // Using static method
 * IsThen.ok("hello", (val) => console.log(val), () => console.log("undefined"));
 * // Output: "hello"
 *
 * @example
 * // Using instance method with chaining
 * const checker = new IsThen();
 * checker
 *   .ok(42, (val) => console.log(val))
 *   .isTrue(true, () => console.log("is true"));
 * // Output: 42, "is true"
 */
export class IsThen {
  /**
   * Static method to check if a value is defined and execute a handler.
   *
   * @template T - The type of the value being checked.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value: T) => void} handler - The callback to execute if the value is defined.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not defined.
   * @returns {IsThen} A new `IsThen` instance for chaining.
   */
  static ok<T>(
    value: Optional<T>,
    handler: (value: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.ok(value, handler, elseHandler);
  }

  /**
   * Static method to check if a value is `true` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: T) => void} handler - The callback to execute if the value is `true`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not `true`.
   * @returns {IsThen} A new `IsThen` instance for chaining.
   */
  static isTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isTrue(value, handler, elseHandler);
  }

  /**
   * Static method to check if a value is not `true` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: Optional<T>) => void} handler - The callback to execute if the value is not `true`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is `true`.
   * @returns {IsThen} A new `IsThen` instance for chaining.
   */
  static isNotTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isNotTrue(value, handler, elseHandler);
  }

  /**
   * Static method to check if a value is `false` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: T) => void} handler - The callback to execute if the value is `false`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not `false`.
   * @returns {IsThen} A new `IsThen` instance for chaining.
   */
  static isFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isFalse(value, handler, elseHandler);
  }

  /**
   * Static method to check if a value is not `false` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: Optional<T>) => void} handler - The callback to execute if the value is not `false`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is `false`.
   * @returns {IsThen} A new `IsThen` instance for chaining.
   */
  static isNotFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isNotFalse(value, handler, elseHandler);
  }

  /**
   * Instance method to check if a value is defined and execute a handler.
   *
   * @template T - The type of the value being checked.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value: T) => void} handler - The callback to execute if the value is defined.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not defined.
   * @returns {IsThen} The current `IsThen` instance for chaining.
   */
  ok<T>(
    value: Optional<T>,
    handler: (value: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    if (isDefined(value)) {
      handler(value);
    } else {
      elseHandler?.();
    }
    return this;
  }

  /**
   * Instance method to check if a value is `true` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: T) => void} handler - The callback to execute if the value is `true`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not `true`.
   * @returns {IsThen} The current `IsThen` instance for chaining.
   */
  isTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    if (value === true) {
      handler(value);
    } else {
      elseHandler?.();
    }
    return this;
  }

  /**
   * Instance method to check if a value is not `true` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: Optional<T>) => void} handler - The callback to execute if the value is not `true`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is `true`.
   * @returns {IsThen} The current `IsThen` instance for chaining.
   */
  isNotTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    if (value !== true) {
      handler(value);
    } else {
      elseHandler?.();
    }
    return this;
  }

  /**
   * Instance method to check if a value is `false` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: T) => void} handler - The callback to execute if the value is `false`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is not `false`.
   * @returns {IsThen} The current `IsThen` instance for chaining.
   */
  isFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    if (value === false) {
      handler(value);
    } else {
      elseHandler?.();
    }
    return this;
  }

  /**
   * Instance method to check if a value is not `false` and execute a handler.
   *
   * @template T - A type extending boolean.
   * @param {Optional<T>} value - The value to check (can be undefined or null).
   * @param {(value?: Optional<T>) => void} handler - The callback to execute if the value is not `false`.
   * @param {() => void} [elseHandler] - Optional callback to execute if the value is `false`.
   * @returns {IsThen} The current `IsThen` instance for chaining.
   */
  isNotFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    if (value !== false) {
      handler(value);
    } else {
      elseHandler?.();
    }
    return this;
  }
}
