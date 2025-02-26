export class Value<T = unknown, O extends keyof Value = 'any'> {
  constructor(protected readonly value: T) {}
  /**
   * @ignore
   * @returns
   */
  any<E extends keyof Value, R extends Omit<Value<T, O | E>, O | E>>(): R {
    return this as unknown as R;
  }

  def<
    E extends 'def' | 'udef' | 'opt',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  udef<
    E extends 'def' | 'udef' | 'opt',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  opt<
    E extends 'def' | 'udef' | 'opt',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  str<
    E extends 'str' | 'min' | 'max',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  minlen<
    E extends 'str' | 'min' | 'max',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  maxlen<
    E extends 'str' | 'min' | 'max',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  min<
    E extends 'str' | 'minlen' | 'maxlen',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }

  max<
    E extends 'str' | 'minlen' | 'maxlen',
    R extends Omit<Value<T, O | E>, O | E>
  >(): R {
    return this as unknown as R;
  }
}

export function val<T>(value: T): Value<T> {
  return new Value<T>(value);
}
