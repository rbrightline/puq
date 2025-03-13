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
} from '@puq/entity';
import { EntityService, IDDto } from '@puq/orm';
import { InjectEntityService } from '@puq/provider';
import { debug } from '@puq/debug';

// class CustomValiationPipe extends ValidationPipe {
//   override transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//     console.log(value, '<< transform');
//     return super.transform(value, metadata);
//   }

//   protected override validate(
//     object: object,
//     validatorOptions?: ValidatorOptions,
//   ): Promise<ValidationError[]> | ValidationError[] {
//     return super.validate(object, validatorOptions);
//   }
// }

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
  findAll(@Query() query: QueryManySampleDto) {
    debug(query);
    return this.service.find(query);
  }

  @FindOneById()
  findOneById(@Param() objectID: IDDto) {
    debug(objectID);
    return this.service.findOneByIdOrThrow(objectID.id);
  }

  @Count()
  count(@Query() query: QueryCountSampleDto) {
    debug(query);
    return this.service.count(query);
  }

  @SaveOne()
  saveOne(@Body() entity: CreateSampleDto) {
    debug(entity);
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
  deleteOneById(@Param() objectId: IDDto) {
    debug(objectId);
    return this.service.softDelete(objectId.id);
  }

  @AddRelation()
  addRelation(@Param() relation: SampleRelationParamDto) {
    debug(relation);
    return this.service.addRelation(relation);
  }

  @RemoveRelation()
  removeRelation(@Param() relation: SampleRelationParamDto) {
    debug(relation);
    return this.service.removeRelation(relation);
  }

  @SetRelation()
  setRelation(@Param() relation: SampleRelationParamDto) {
    debug(relation);
    return this.service.setRelation(relation);
  }

  @UnsetRelation()
  unsetRelation(@Param() relation: SampleUnsetRelationParamDto) {
    debug(relation);
    return this.service.unsetRelation(relation);
  }
}
