import { newFrom } from './new-from.js';

describe('newFrom with inferred parameters', () => {
  interface TestCase {
    instance: any;
    parameters: any[];
    expected: any;
    description: string;
  }

  const testCases: TestCase[] = [
    {
      instance: new (class Person {
        constructor(
          public name: string,
          public age: number,
        ) {}
      })('Alice', 30),
      parameters: ['Bob', 25],
      expected: { name: 'Bob', age: 25 },
      description: 'class with two parameters',
    },
    {
      instance: new (class NoArgs {
        value = 'default';
      })(),
      parameters: [],
      expected: { value: 'default' },
      description: 'no-arg constructor',
    },
    {
      instance: new (class Optional {
        constructor(
          public name: string,
          public flag?: boolean,
        ) {}
      })('Alice'),
      parameters: ['Bob', true],
      expected: { name: 'Bob', flag: true },
      description: 'optional parameter',
    },
  ];

  it.each(testCases)(
    'Test case %i: $description infers parameters correctly',
    ({ instance, parameters, expected, description }) => {
      const newInstance = newFrom(instance, ...parameters);

      expect(newInstance).not.toBe(instance);
      expect(newInstance).toBeInstanceOf(instance.constructor);
      expect(newInstance).toEqual(expected);
    },
  );

  it('throws for invalid input', () => {
    expect(() => newFrom(null as any, 'test')).toThrowError();
  });

  it('type-checks parameter mismatch', () => {
    class Person {
      constructor(public name: string) {}
    }
    const original = new Person('Alice');

    newFrom(original, [42]); // Type error at compile time
  });
});
