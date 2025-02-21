import { Dto, Property } from '@puq/property';
@Dto()
export class CommonQueryDto {
  @Property({
    type: 'boolean',
    description: 'Include deleted items to the load',
    default: false,
    acceptString: true,
  })
  withDeleted?: boolean;
}
