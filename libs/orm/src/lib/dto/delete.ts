import { ApiProperty } from '@puq/property';
import { DeleteResult } from '@puq/type';
import { Exclude } from 'class-transformer';

@Exclude()
export class DeleteResultDto implements DeleteResult {
  @ApiProperty({
    type: 'integer',
    description: 'The number of items affected by the delete operation',
  })
  affected: number;
}
