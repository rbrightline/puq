import type { DeleteResult } from '@puq/type';
import { Dto, Property } from '@puq/property';

/**
 * Delete result dto
 */
@Dto()
export class DeleteResultDto implements DeleteResult {
  @Property({
    type: 'integer',
    description: 'The number of items affected by the delete operation',
  })
  affected: number;
}
