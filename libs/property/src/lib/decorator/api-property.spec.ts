import { ApiProperty } from './api-property.js';
describe('ApiProperty', () => {
  it('should work', () => {
    ApiProperty({ type: 'string', required: true });
    ApiProperty({ type: 'number', required: true });
    ApiProperty({ type: 'integer', required: true });
    ApiProperty({ type: 'boolean', required: true });
    ApiProperty({ type: 'bigint', required: true });
    ApiProperty({ type: 'date', required: true });
    ApiProperty({
      type: 'array',
      items: { type: 'string', required: true },
      required: true,
    });
    ApiProperty({ type: 'object', required: true, target: () => class A {} });
  });
});
