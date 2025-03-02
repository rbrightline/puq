import type { CountResult } from '@puq/type';
import { Dto, Property } from '@puq/property';

/**
 * Count result
 */
@Dto()
export class CountResultDto implements CountResult {
  @Property({
    type: 'integer',
    description: 'The number of items mached the query',
  })
  count: number;
}
