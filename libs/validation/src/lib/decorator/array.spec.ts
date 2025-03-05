import { PropertyOptions } from '@puq/type';
import { PropertyValidation } from './property.js';
import  { } from '@puq/testing'
class TestClass extends createTestClas


describe('PropertyValidation: Array', () => {
  it.each`
    value                | expected
    ${{} as SampleClass} | ${''}
  `('should output $expected from $options', ({ options, expected }) => {
    expect(options).toEqual(expected);
  });
});
