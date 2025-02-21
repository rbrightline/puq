import { ApiProperty } from '@puq/property';
import { UpdateResult } from '@puq/type';
import { Exclude } from 'class-transformer';

/**
 * Update result
 */
@Exclude()
export class UpdateResultDto implements UpdateResult {
  @ApiProperty({
    type: 'integer',
    description: 'The number of items affected by the update operation',
  })
  affected: number;
}
