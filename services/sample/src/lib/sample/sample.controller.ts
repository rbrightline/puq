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
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string' }) sample: string;
}

@Entity()
export class Other {
  @Column({ type: 'string' }) other: string;
}

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  @FindAll()
  findAll() {
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

@Controller()
export class OtherController extends CreateController({
  entity: () => Other,
}) {
  @FindAll()
  findAll() {
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
