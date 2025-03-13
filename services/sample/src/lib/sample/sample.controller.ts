import '@puq/type';
import {
  Controller,
  CreateController,
  FindAll,
  FindOneById,
  Count,
  SaveOne,
  UpdateOneById,
  DeleteOneById,
  AddRelation,
  RemoveRelation,
  SetRelation,
  UnsetRelation,
  Increment,
  Decrement,
  RestoreOneById,
} from '@puq/rest';
import { Body, Param, Query } from '@nestjs/common';
import {
  Sample,
  QueryManySampleDto,
  CreateSampleDto,
  UpdateSampleDto,
  SampleRelationParamDto,
  SampleUnsetRelationParamDto,
  QueryCountSampleDto,
  IncrementSampleDto,
  DecrementSampleDto,
} from '@puq/entity';
import { EntityService, IDDto, InjectEntityService } from '@puq/orm';

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>,
  ) {
    super(service);
  }
  @FindAll()
  findAll(@Query() query: QueryManySampleDto) {
    return this.service.find(query);
  }

  @FindOneById()
  findOneById(@Param() objectID: IDDto) {
    return this.service.findOneByIdOrThrow(objectID);
  }

  @Count()
  count(@Query() query: QueryCountSampleDto) {
    return this.service.count(query);
  }

  @SaveOne()
  saveOne(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @UpdateOneById()
  updateOneById(@Param() objectId: IDDto, @Body() entity: UpdateSampleDto) {
    return this.service.update(objectId, entity);
  }

  @DeleteOneById()
  deleteOneById(@Param() objectId: IDDto) {
    return this.service.softDelete(objectId);
  }

  @RestoreOneById()
  restore(@Param() objectId: IDDto) {
    return this.service.restore(objectId);
  }

  @AddRelation()
  addRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.addRelation(relation);
  }

  @RemoveRelation()
  removeRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.removeRelation(relation);
  }

  @SetRelation()
  setRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.setRelation(relation);
  }

  @UnsetRelation()
  unsetRelation(@Param() relation: SampleUnsetRelationParamDto) {
    return this.service.unsetRelation(relation);
  }

  @Increment()
  increment(@Param() param: IncrementSampleDto) {
    return this.service.increment(param);
  }

  @Decrement()
  decrement(@Param() param: DecrementSampleDto) {
    return this.service.decrement(param);
  }
}
