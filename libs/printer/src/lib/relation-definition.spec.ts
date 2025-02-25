import { RelationOptions as O } from '@puq/type';
import { relationDefinition } from './relation-definition.js';

describe('relationDefinition', () => {
  it.each`
    options                                                              | expected
    ${{ name: 'product', type: 'many-to-one', target: 'Product' } as O}  | ${'product?: Product;'}
    ${{ name: 'product', type: 'one-to-one', target: 'Product' } as O}   | ${'product?: Product;'}
    ${{ name: 'product', type: 'many-to-many', target: 'Product' } as O} | ${'product?: Product[];'}
    ${{ name: 'product', type: 'one-to-many', target: 'Product' } as O}  | ${'product?: Product[];'}
  `('should print $expected from $options', ({ options, expected }) => {
    expect(relationDefinition(options)).toEqual(expected);
  });
});
