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
  Query,
} from '@puq/rest';
import {
  Sample,
  QueryManySampleDto,
  QueryOneSampleDto,
  QueryCountSampleDto,
  CreateSampleDto,
  UpdateSampleDto,
  SampleRelationParamDto,
  SampleUnsetRelationParamDto,
} from '@puq/entity';
import { EntityService, IDDto } from '@puq/orm';
import { InjectEntityService } from '@puq/provider';
import { debug } from 'console';

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
  createDto: () => CreateSampleDto,
  updateDto: () => UpdateSampleDto,
  queryManyDto: () => QueryManySampleDto,
  queryOneDto: () => QueryOneSampleDto,
  queryCountDto: () => QueryCountSampleDto,
  unsetRelationDto: undefined,
  relationDto: undefined,
  isPublic: false,
}) {
  constructor(
    @InjectEntityService(Sample)
    protected readonly service: EntityService<Sample>,
  ) {
    super(service);
  }

  @FindAll()
  findAll(@Query(() => QueryManySampleDto) query: any) {
    debug(query);
    return this.service.find(query);
  }

  @FindOneById()
  findOneById(@Param() objectID: IDDto) {
    debug(objectID);
    return this.service.findOneById(objectID.id);
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
