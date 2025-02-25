import { PropertyOptions as O } from '@puq/type';
import { propertyType } from './property-type.js';

describe('propertyType', () => {
  it.each`
    options                                               | expected
    ${{ type: 'string' } as O}                            | ${'string'}
    ${{ type: 'number' } as O}                            | ${'number'}
    ${{ type: 'integer' } as O}                           | ${'number'}
    ${{ type: 'bigint' } as O}                            | ${'bigint'}
    ${{ type: 'boolean' } as O}                           | ${'boolean'}
    ${{ type: 'object', target: 'Some' as any } as O}     | ${'Some'}
    ${{ type: 'array', items: { type: 'string' } } as O}  | ${'string[]'}
    ${{ type: 'array', items: { type: 'number' } } as O}  | ${'number[]'}
    ${{ type: 'array', items: { type: 'boolean' } } as O} | ${'boolean[]'}
    ${{ type: 'array', items: { type: 'integer' } } as O} | ${'number[]'}
    ${{ type: 'array', items: { type: 'bigint' } } as O}  | ${'bigint[]'}
    ${{ type: 'string' } as O}                            | ${'string'}
    ${{ type: 'number' } as O}                            | ${'number'}
    ${{ type: 'integer' } as O}                           | ${'number'}
    ${{ type: 'bigint' } as O}                            | ${'bigint'}
    ${{ type: 'boolean' } as O}                           | ${'boolean'}
    ${{ type: 'object', target: 'Some' as any } as O}     | ${'Some'}
    ${{ type: 'array', items: { type: 'string' } } as O}  | ${'string[]'}
    ${{ type: 'array', items: { type: 'number' } } as O}  | ${'number[]'}
    ${{ type: 'array', items: { type: 'boolean' } } as O} | ${'boolean[]'}
    ${{ type: 'array', items: { type: 'integer' } } as O} | ${'number[]'}
    ${{ type: 'array', items: { type: 'bigint' } } as O}  | ${'bigint[]'}
  `('should output $expected from $options', ({ options, expected }) => {
    expect(propertyType(options)).toEqual(expected);
  });
});
