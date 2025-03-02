import type { UpdateResult } from '@puq/type';
import { Dto, Property } from '@puq/property';

/**
 * Update result
 */
@Dto()
export class UpdateResultDto implements UpdateResult {
  @Property({
    type: 'integer',
    description: 'The number of items affected by the update operation',
  })
  affected: number;
}
