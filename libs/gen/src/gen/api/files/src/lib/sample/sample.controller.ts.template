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
} from '@puq/rest';
import {
  Sample,
  QueryManySampleDto,
  QueryOneSampleDto,
  CreateSampleDto,
  UpdateSampleDto,
  SampleRelationParamDto,
  SampleUnsetRelationParamDto,
} from '@puq/entity';
import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EntityService } from '@puq/orm';
import { InjectEntityService } from '@puq/provider';

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
  createDto: () => CreateSampleDto,
  updateDto: () => UpdateSampleDto,
  queryManyDto: () => QueryManySampleDto,
  queryOneDto: () => QueryOneSampleDto,
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
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneById(id);
  }

  @Count()
  count(@Query() query: QueryOneSampleDto) {
    return this.service.count(query);
  }

  @SaveOne()
  saveOne(@Body() entity: CreateSampleDto) {
    return this.service.save(entity);
  }

  @UpdateOneById()
  updateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: UpdateSampleDto,
  ) {
    return this.service.update(id, entity);
  }

  @DeleteOneById()
  DeleteOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDelete(id);
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
