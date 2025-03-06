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
  static ok<T>(
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
  static isTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isTrue(value, handler, elseHandler);
  }

  /**
   * Run function if the `value` is not `true`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `true`
   * @returns - this
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
   * Run function if the `value` is `false`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `false`
   * @returns - this
   */
  static isFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isFalse(value, handler, elseHandler);
  }

  static isNotFalse<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isNotFalse(value, handler, elseHandler);
  }

  /**
   * Run function if the `value` is defined.
   * @param value any value
   * @param handler the `function` to run when the `value` is defined
   * @returns - this
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
   * Run function if the `value` is `true`.
   * @param value any value
   * @param handler the `function` to run when the `value` is `true`
   * @returns - this
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
