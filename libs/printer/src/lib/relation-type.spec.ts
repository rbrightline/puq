import { RelationOptions as O } from '@puq/type';
import { relationType } from './relation-type.js';

describe('relationType', () => {
  it.each`
    options                                          | expected
    ${{ type: 'many-to-one', target: 'Some' } as O}  | ${'Some'}
    ${{ type: 'one-to-one', target: 'Some' } as O}   | ${'Some'}
    ${{ type: 'many-to-many', target: 'Some' } as O} | ${'Some[]'}
    ${{ type: 'one-to-many', target: 'Some' } as O}  | ${'Some[]'}
  `('should output $expected from $options', ({ options, expected }) => {
    expect(relationType(options)).toEqual(expected);
  });
});
