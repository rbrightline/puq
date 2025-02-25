import { PropertyOptions } from '@puq/type';
import { propertyDecorator } from './property-decorator.js';

describe('ProperyDecorator', () => {
  it.each`
    options                                                         | expected
    ${{} as PropertyOptions}                                        | ${'@Property({})'}
    ${{ type: 'string', minLength: 3 } as PropertyOptions}          | ${'@Property({"type":"string","minLength":3})'}
    ${{ type: 'string', maxLength: 3 } as PropertyOptions}          | ${'@Property({"type":"string","maxLength":3})'}
    ${{ type: 'string', acceptString: true } as PropertyOptions}    | ${'@Property({"type":"string","acceptString":true})'}
    ${{ type: 'string', disabled: true } as PropertyOptions}        | ${'@Property({"type":"string","disabled":true})'}
    ${{ type: 'number', maximum: 3 } as PropertyOptions}            | ${'@Property({"type":"number","maximum":3})'}
    ${{ type: 'object', target: 'Some' as any } as PropertyOptions} | ${'@Property({"type":"object","target":()=>Some})'}
  `('should print $expected from $options', ({ options, expected }) => {
    expect(propertyDecorator('Property', options)).toEqual(expected);
  });
});
