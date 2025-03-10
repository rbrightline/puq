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
  FindOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneById(id);
  }

  @Count()
  Count(@Query() query: QueryOneSampleDto) {
    return this.service.count(query);
  }

  @SaveOne()
  SaveOne(@Body() entity: CreateSampleDto) {
    return this.service.save(entity as Sample);
  }

  @UpdateOneById()
  UpdateOneById(
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
  AddRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.addRelation(relation);
  }

  @RemoveRelation()
  RemoveRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.removeRelation(relation);
  }

  @SetRelation()
  SetRelation(@Param() relation: SampleRelationParamDto) {
    return this.service.setRelation(relation);
  }

  @UnsetRelation()
  UnsetRelation(@Param() relation: SampleUnsetRelationParamDto) {
    return this.service.unsetRelation(relation);
  }
}
