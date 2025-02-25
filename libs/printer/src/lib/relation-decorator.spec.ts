import { RelationOptions as O } from '@puq/type';
import { relationDecorator } from './relation-decorator.js';

describe('RelationDecorator', () => {
  it.each`
    options                                                               | expected
    ${{ type: 'many-to-many', target: 'Sample' } as O}                    | ${`@Relation({"type":"many-to-many","target":()=>Sample})`}
    ${{ type: 'many-to-one', target: 'Sample' } as O}                     | ${`@Relation({"type":"many-to-one","target":()=>Sample})`}
    ${{ type: 'one-to-one', target: 'Sample' } as O}                      | ${`@Relation({"type":"one-to-one","target":()=>Sample})`}
    ${{ type: 'one-to-many', target: 'Sample' } as O}                     | ${`@Relation({"type":"one-to-many","target":()=>Sample})`}
    ${{ type: 'one-to-many', target: 'Other', cascade: true } as O}       | ${`@Relation({"type":"one-to-many","target":()=>Other,"cascade":true})`}
    ${{ type: 'one-to-many', target: 'Other', description: '' } as O}     | ${`@Relation({"type":"one-to-many","target":()=>Other,"description":""})`}
    ${{ type: 'one-to-many', target: 'Other', eager: true } as O}         | ${`@Relation({"type":"one-to-many","target":()=>Other,"eager":true})`}
    ${{ type: 'one-to-many', target: 'Other', join: true } as O}          | ${`@Relation({"type":"one-to-many","target":()=>Other,"join":true})`}
    ${{ type: 'one-to-many', target: 'Other', onDelete: 'CASCADE' } as O} | ${`@Relation({"type":"one-to-many","target":()=>Other,"onDelete":"CASCADE"})`}
    ${{ type: 'one-to-many', target: 'Other', onUpdate: 'CASCADE' } as O} | ${`@Relation({"type":"one-to-many","target":()=>Other,"onUpdate":"CASCADE"})`}
    ${{ type: 'one-to-many', target: 'Other', refColumn: 'other' } as O}  | ${`@Relation({"type":"one-to-many","target":()=>Other,"refColumn":"other"})`}
    ${{ type: 'one-to-many', target: 'Other', required: true } as O}      | ${`@Relation({"type":"one-to-many","target":()=>Other,"required":true})`}
  `('should output $expected from $options', ({ options, expected }) => {
    expect(relationDecorator('Relation', options)).toEqual(expected);
  });
});
