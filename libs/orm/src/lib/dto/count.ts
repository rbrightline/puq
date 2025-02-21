import { ApiProperty } from '@puq/property';
import { CountResult } from '@puq/type';
import { Exclude } from 'class-transformer';

/**
 * Count result
 */
@Exclude()
export class CountResultDto implements CountResult {
  @ApiProperty({
    type: 'integer',
    description: 'The number of items mached the query',
  })
  count: number;
}
