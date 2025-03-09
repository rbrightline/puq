import { CreateRelationParamDto, CreateUnsetRelationParamDto } from '@puq/orm';
import { Dto } from '@puq/property';

@Dto()
export class SampleRelationParamDto extends CreateRelationParamDto([]) {}

@Dto()
export class SampleUnsetRelationParamDto extends CreateUnsetRelationParamDto(
  [],
) {}
