import { PropertyOptions } from '@puq/type';
import { propertyDecorator } from './property-decorator.js';

describe('ProperyDecorator', () => {
  it.each`
    name          | options                                                         | expected
    ${'Property'} | ${{} as PropertyOptions}                                        | ${'@Property({})'}
    ${'Property'} | ${{ type: 'string', minLength: 3 } as PropertyOptions}          | ${'@Property({"type":"string","minLength":3})'}
    ${'Property'} | ${{ type: 'object', target: 'Some' as any } as PropertyOptions} | ${'@Property({"type":"object","target":"()=>Some"})'}
  `('should print $expected from $options', ({ name, options, expected }) => {
    expect(propertyDecorator(name, options)).toEqual(expected);
  });
});
