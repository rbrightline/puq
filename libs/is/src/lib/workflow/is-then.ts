import type { Optional } from '@puq/type';
import { isDefined } from '../defined/is-defined.js';

/**
 * Workflow class to simplify conditional work flows.
 */
export class IsThen {
  /**
   * Run function if the `value` is defined.
   * @param value any value
   * @param handler the `function` to run when the `value` is defined
   * @returns - this
   */
  public static ok<T>(
    value: Optional<T>,
    handler: (value: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.ok(value, handler, elseHandler);
  }

  /**
   * Run function if the `value` is `true`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `true`
   * @returns - this
   */
  public static isTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isTrue(value, handler, elseHandler);
  }

  /**
   * Run function if the `value` is `false`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `false`
   * @returns - this
   */
  public static isFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isFalse(value, handler, elseHandler);
  }

  /**
   * Run function if the `value` is defined.
   * @param value any value
   * @param handler the `function` to run when the `value` is defined
   * @returns - this
   */
  public ok<T>(
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
   * Run function if the `value` is `true`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `true`
   * @returns - this
   */
  public isTrue<T extends boolean>(
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
   * Run function if the `value` is `false`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `false`
   * @returns - this
   */
  public isFalse<T extends boolean>(
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
}
