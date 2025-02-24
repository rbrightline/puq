import { PropertyOptions as O } from '@puq/type';
import { propertyDefinition } from './property-definition.js';

describe('propertyDefinition', () => {
  it.each`
    options                                                                             | expected
    ${{ name: 'name', type: 'string' } as O}                                            | ${'name?: string;'}
    ${{ name: 'name', type: 'number' } as O}                                            | ${'name?: number;'}
    ${{ name: 'name', type: 'integer' } as O}                                           | ${'name?: number;'}
    ${{ name: 'name', type: 'bigint' } as O}                                            | ${'name?: bigint;'}
    ${{ name: 'name', type: 'boolean' } as O}                                           | ${'name?: boolean;'}
    ${{ name: 'name', type: 'object', target: 'Some' as any } as O}                     | ${'name?: Some;'}
    ${{ name: 'name', type: 'array', items: { type: 'string' } } as O}                  | ${'name?: string[];'}
    ${{ name: 'name', type: 'array', items: { type: 'number' } } as O}                  | ${'name?: number[];'}
    ${{ name: 'name', type: 'array', items: { type: 'boolean' } } as O}                 | ${'name?: boolean[];'}
    ${{ name: 'name', type: 'array', items: { type: 'integer' } } as O}                 | ${'name?: number[];'}
    ${{ name: 'name', type: 'array', items: { type: 'bigint' } } as O}                  | ${'name?: bigint[];'}
    ${{ name: 'name', required: true, type: 'string' } as O}                            | ${'name: string;'}
    ${{ name: 'name', required: true, type: 'number' } as O}                            | ${'name: number;'}
    ${{ name: 'name', required: true, type: 'integer' } as O}                           | ${'name: number;'}
    ${{ name: 'name', required: true, type: 'bigint' } as O}                            | ${'name: bigint;'}
    ${{ name: 'name', required: true, type: 'boolean' } as O}                           | ${'name: boolean;'}
    ${{ name: 'name', required: true, type: 'object', target: 'Some' as any } as O}     | ${'name: Some;'}
    ${{ name: 'name', required: true, type: 'array', items: { type: 'string' } } as O}  | ${'name: string[];'}
    ${{ name: 'name', required: true, type: 'array', items: { type: 'number' } } as O}  | ${'name: number[];'}
    ${{ name: 'name', required: true, type: 'array', items: { type: 'boolean' } } as O} | ${'name: boolean[];'}
    ${{ name: 'name', required: true, type: 'array', items: { type: 'integer' } } as O} | ${'name: number[];'}
    ${{ name: 'name', required: true, type: 'array', items: { type: 'bigint' } } as O}  | ${'name: bigint[];'}
  `('should print $expected from $options', ({ options, expected }) => {
    expect(propertyDefinition(options)).toEqual(expected);
  });
});
