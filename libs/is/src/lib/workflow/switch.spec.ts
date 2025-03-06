import { Optional } from '@puq/type';
import { Switch } from './switch.js';

describe(Switch.name, () => {
  const a = vi.fn();
  const b = vi.fn();
  const c = vi.fn();

  type Digits = 1 | 2 | 3 | 4;
  let value: Optional<Digits> = 1;

  it('should work', () => {
    ((value: Digits) => {
      Switch.switchValue(value)
        .inCaseOf(1, a)
        .inCaseOf(2, b)
        .inCaseOf(3, b)
        .inCaseOf(4, c);
    })(1);

    expect(a).toBeCalledTimes(1);
    expect(b).toBeCalledTimes(0);
    expect(c).toBeCalledTimes(0);
  });
});
