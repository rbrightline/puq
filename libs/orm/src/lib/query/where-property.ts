import { ApiProperty } from '@puq/property';
import type { BaseModel, PropertyDecoratorParam } from '@puq/type';
import type { CreateQueryOptions } from './create-query-options.js';
import { Expose } from 'class-transformer';
import { WhereQueryTransformer } from './where-query-transformer.js';

export function WhereProperty<T extends BaseModel>(
  options: CreateQueryOptions<T>,
): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    WhereQueryTransformer(options)(...args);
    Expose()(...args);
    ApiProperty({ type: 'array', items: { type: 'string', required: true } })(
      ...args,
    );
  };
}
