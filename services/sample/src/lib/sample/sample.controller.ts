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
import { Entity, Column, BaseEntity, CreateRelationParamDto } from '@puq/orm';
import { Dto } from '@puq/property';
import {
  Body,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string' }) sample: string;
}

@Dto()
export class AddRelationDto extends CreateRelationParamDto(['some', 'other']) {}

@Entity()
export class Other {
  @Column({ type: 'string' }) other: string;
}

@Controller()
export class SampleController extends CreateController({
  entity: () => Sample,
}) {
  @FindAll()
  findAll(@Query('take') take: number) {
    throw new NotFoundException();
  }

  @FindOneById()
  FindOneById(@Param('id') id: number) {
    return 'FindOneById';
  }

  @Count()
  Count() {
    throw new InternalServerErrorException();
  }

  @SaveOne()
  SaveOne(@Body() sample: Sample) {
    throw new UnprocessableEntityException();
  }

  @UpdateOneById()
  UpdateOneById(@Param('id') id: number, @Body() sample: Sample) {
    return 'UpdateOneById';
  }

  @DeleteOneById()
  DeleteOneById(@Param('id') id: number) {
    return 'DeleteOneById';
  }

  @AddRelation()
  AddRelation(@Query() params: AddRelationDto) {
    throw new UnauthorizedException();
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
