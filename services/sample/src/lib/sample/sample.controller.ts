import { Rest } from '@puq/rest';
import { Body, Param, Query } from '@nestjs/common';
import {
  Sample,
  CreateSampleDto,
  UpdateSampleDto,
  SampleRelationParamDto,
  SampleUnsetRelationParamDto,
  QueryCountSampleDto,
  IncrementSampleDto,
  DecrementSampleDto,
  QueryManySampleDto,
  QueryOneSampleDto,
} from '@puq/entity';
import { EntityService, IDDto, InjectEntityService } from '@puq/orm';

@Rest.Controller()
export class SampleController {
  @Rest.SetResourceMetadata({ entity: () => Sample })
  protected readonly __metadata__ = '';

  constructor(
    @InjectEntityService() protected readonly service: EntityService<Sample>,
  ) {}

  @Rest.Find()
  find(@Query() query: QueryManySampleDto) {
    return this.service.find(query);
  }

  @Rest.FindOneById()
  findOneById(@Param() param: IDDto, @Query() query: QueryOneSampleDto) {
    return this.service.findOneByIdOrThrow(param, query);
  }

  @Rest.Count()
  count(@Query() query: QueryCountSampleDto) {
    return this.service.count(query);
  }

  @Rest.SaveOne()
  saveOne(@Body() body: CreateSampleDto) {
    return this.service.save(body);
  }

  @Rest.UpdateOneById()
  updateOneById(@Param() param: IDDto, @Body() body: UpdateSampleDto) {
    return this.service.update(param, body);
  }

  @Rest.DeleteOneById()
  deleteOneById(@Param() param: IDDto) {
    return this.service.softDelete(param);
  }

  @Rest.RestoreOneById()
  restore(@Param() param: IDDto) {
    return this.service.restore(param);
  }

  @Rest.AddRelation()
  addRelation(@Param() param: SampleRelationParamDto) {
    return this.service.addRelation(param);
  }

  @Rest.RemoveRelation()
  removeRelation(@Param() param: SampleRelationParamDto) {
    return this.service.removeRelation(param);
  }

  @Rest.SetRelation()
  setRelation(@Param() param: SampleRelationParamDto) {
    return this.service.setRelation(param);
  }

  @Rest.UnsetRelation()
  unsetRelation(@Param() param: SampleUnsetRelationParamDto) {
    return this.service.unsetRelation(param);
  }

  @Rest.Increment()
  increment(@Param() param: IDDto, @Body() body: IncrementSampleDto) {
    return this.service.increment(param, body);
  }

  @Rest.Decrement()
  decrement(@Param() param: IDDto, @Body() body: DecrementSampleDto) {
    return this.service.decrement(param, body);
  }
}
