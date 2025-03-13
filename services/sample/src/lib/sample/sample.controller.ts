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
  Body,
  Param,
} from '@puq/rest';
import { Query, ValidationPipe } from '@nestjs/common';
import {
  Sample,
  QueryManySampleDto,
  QueryOneSampleDto,
  CreateSampleDto,
  UpdateSampleDto,
  SampleRelationParamDto,
  SampleUnsetRelationParamDto,
} from '@puq/entity';
import { EntityService, IDDto } from '@puq/orm';
import { InjectEntityService } from '@puq/provider';
import { debug } from '@puq/debug';

class CustomValiationPipe extends ValidationPipe {}

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
  isPublic: false,
}) {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>,
  ) {
    super(service);
  }

  @FindAll()
  findAll(@Query(CustomValiationPipe) query: QueryManySampleDto) {
    debug(query);
    return this.service.find(query);
  }

  @FindOneById()
  findOneById(@Param() objectID: IDDto) {
    debug(objectID);
    return this.service.findOneById(objectID.id);
  }

  @Count()
  count(@Query(CustomValiationPipe) query: QueryOneSampleDto) {
    debug(query);
    return this.service.count(query);
  }

  @SaveOne()
  saveOne(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @UpdateOneById()
  updateOneById(@Param() objectId: IDDto, @Body() entity: UpdateSampleDto) {
    debug({
      objectId,
      entity,
    });
    return this.service.update(objectId.id, entity);
  }

  @DeleteOneById()
  DeleteOneById(@Param() objectId: IDDto) {
    return this.service.softDelete(objectId.id);
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
}
