import type { Optional } from '@puq/type';
import { isDefined } from '../defined/is-defined.js';

/**
 * - [ ] add docs
 * Workflow class to simplify conditional work flows.
 */
export class IsThen {
  static ok<T>(
    value: Optional<T>,
    handler: (value: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.ok(value, handler, elseHandler);
  }

  static isTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: T) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isTrue(value, handler, elseHandler);
  }

  static isNotTrue<T extends boolean>(
    value: Optional<T>,
    handler: (value?: Optional<T>) => void,
    elseHandler?: () => void,
  ): IsThen {
    const instance = new IsThen();
    return instance.isNotTrue(value, handler, elseHandler);
  }

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
