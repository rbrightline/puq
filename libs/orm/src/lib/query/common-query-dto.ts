import { Dto, Property } from '@puq/property';

/**
 * Common query dto
 */
@Dto()
export class CommonQueryDto {
  @Property({
    type: 'boolean',
    description: 'Include deleted items to the load',
    default: false,
  })
  withDeleted?: boolean;
}
