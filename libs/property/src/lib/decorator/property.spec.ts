import { Property } from './property.js';
describe('ApiProperty', () => {
  it('should work', () => {
    Property({ type: 'string', required: true });
    Property({ type: 'number', required: true });
    Property({ type: 'integer', required: true });
    Property({ type: 'boolean', required: true });
    Property({ type: 'bigint', required: true });
    Property({ type: 'date', required: true });
    Property({
      type: 'array',
      items: { type: 'string', required: true },
      required: true,
    });
    Property({ type: 'object', required: true, target: () => class A {} });
  });
});
