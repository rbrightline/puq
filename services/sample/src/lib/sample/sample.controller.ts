import '@puq/type';
import { CreateController, Rest } from '@puq/rest';
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
} from '@puq/entity';
import { EntityService, IDDto, InjectEntityService } from '@puq/orm';

@Rest.Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>,
  ) {
    super(service);
  }
  @Rest.FindAll()
  findAll(@Query() query: QueryManySampleDto) {
    return this.service.find(query);
  }

  @Rest.FindOneById()
  findOneById(@Param() objectID: IDDto) {
    return this.service.findOneByIdOrThrow(objectID);
  }

  @Rest.Count()
  count(@Query() query: QueryCountSampleDto) {
    return this.service.count(query);
  }

  @Rest.SaveOne()
  saveOne(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @Rest.UpdateOneById()
  updateOneById(@Param() objectId: IDDto, @Body() entity: UpdateSampleDto) {
    return this.service.update(objectId, entity);
  }

  @Rest.DeleteOneById()
  deleteOneById(@Param() objectId: IDDto) {
    return this.service.softDelete(objectId);
  }

  @Rest.RestoreOneById()
  restore(@Param() objectId: IDDto) {
    return this.service.restore(objectId);
  }

  @Rest.AddRelation()
  addRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.addRelation(relation);
  }

  @Rest.RemoveRelation()
  removeRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.removeRelation(relation);
  }

  @Rest.SetRelation()
  setRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.setRelation(relation);
  }

  @Rest.UnsetRelation()
  unsetRelation(@Param() relation: SampleUnsetRelationParamDto) {
    return this.service.unsetRelation(relation);
  }

  @Rest.Increment()
  increment(@Param() param: IncrementSampleDto) {
    return this.service.increment(param);
  }

  @Rest.Decrement()
  decrement(@Param() param: DecrementSampleDto) {
    return this.service.decrement(param);
  }
}
