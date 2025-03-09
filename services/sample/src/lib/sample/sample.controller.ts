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
import { Sample, QueryManySampleDto } from '@puq/entity';
import { Query } from '@nestjs/common';

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  @FindAll()
  findAll(@Query() query: QueryManySampleDto) {
    return [];
  }

  @FindOneById()
  FindOneById() {
    return 'FindOneById';
  }

  @Count()
  Count() {
    return 'Count';
  }

  @SaveOne()
  SaveOne() {
    return 'SaveOne';
  }

  @UpdateOneById()
  UpdateOneById() {
    return 'UpdateOneById';
  }

  @DeleteOneById()
  DeleteOneById() {
    return 'DeleteOneById';
  }

  @AddRelation()
  AddRelation() {
    return 'AddRelation';
  }

  @RemoveRelation()
  RemoveRelation() {
    return 'RemoveRelation';
  }

  @SetRelation()
  SetRelation() {
    return 'SetRelation';
  }

  @UnsetRelation()
  UnsetRelation() {
    return 'UnsetRelation';
  }
}
