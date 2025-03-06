import { IsThen } from './is-then.js';

describe(IsThen.name, () => {
  const a = vi.fn();
  const b = vi.fn();
  const c = vi.fn();

  it('should work', () => {
    IsThen.ok(true, () => a())
      .isTrue(true, () => a())
      .ok(true, () => b())
      .isFalse(false, () => b())
      .ok(true, () => c())

      .ok(undefined, () => c())
      .ok(undefined, () => a())
      .ok(undefined, () => b())
      .ok(undefined, () => c())
      .ok(undefined, () => a())
      .ok(undefined, () => b())
      .ok(undefined, () => c());

    expect(a).toBeCalledTimes(2);
    expect(b).toBeCalledTimes(2);
    expect(c).toBeCalledTimes(1);
  });
  it.each`
    options | expected
    ${''}   | ${''}
  `('should output $expected from $options', ({ options, expected }) => {
    expect(options).toEqual(expected);
  });
});
