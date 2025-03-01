import { Dto, Property } from '@puq/property';
import { type DeleteResult } from '@puq/type';

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
