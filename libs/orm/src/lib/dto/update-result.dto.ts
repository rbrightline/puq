import { Dto, Property } from '@puq/property';
import { UpdateResult } from '@puq/type';

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
