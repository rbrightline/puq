import { CreateRelationParamDto, CreateUnsetRelationParamDto } from '@puq/orm';
import { Dto } from '@puq/property';
@Dto()
export class SampleRelationParamDto extends CreateRelationParamDto([
  'attributes',
]) {}

@Dto()
export class SampleUnsetRelationParamDto extends CreateUnsetRelationParamDto([
  'owner',
]) {}
