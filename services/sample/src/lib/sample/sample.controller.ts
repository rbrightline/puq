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

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  @FindAll()
  findAll(@Query() query: QueryManySampleDto) {
    return { query };
  }

  @FindOneById()
  FindOneById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Count()
  Count(@Query() query: QueryOneSampleDto) {
    return { query };
  }

  @SaveOne()
  SaveOne(@Body() entity: CreateSampleDto) {
    return { entity };
  }

  @UpdateOneById()
  UpdateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: UpdateSampleDto,
  ) {
    return {
      id,
      entity,
    };
  }

  @DeleteOneById()
  DeleteOneById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @AddRelation()
  AddRelation(@Param() relation: SampleRelationParamDto) {
    return { relation };
  }

  @RemoveRelation()
  RemoveRelation(@Param() relation: SampleRelationParamDto) {
    return { relation };
  }

  @SetRelation()
  SetRelation(@Param() relation: SampleRelationParamDto) {
    return { relation };
  }

  @UnsetRelation()
  UnsetRelation(@Param() relation: SampleUnsetRelationParamDto) {
    return { relation };
  }
}
