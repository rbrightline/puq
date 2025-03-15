import { Rest } from '@puq/rest';
import { Body, Param, Query } from '@nestjs/common';
import {
  Resource,
  CreateResourceDto,
  UpdateResourceDto,
  ResourceRelationParamDto,
  ResourceUnsetRelationParamDto,
  QueryCountResourceDto,
  IncrementResourceDto,
  DecrementResourceDto,
  QueryManyResourceDto,
  QueryOneResourceDto,
} from '@puq/entity';
import { EntityService, IDDto, InjectEntityService } from '@puq/orm';

@Rest.Controller()
export class ResourceController {
  @Rest.SetResourceMetadata({ entity: () => Resource })
  protected readonly __metadata__ = '';

  constructor(
    @InjectEntityService() protected readonly service: EntityService<Resource>,
  ) {}

  @Rest.Find()
  find(@Query() query: QueryManyResourceDto) {
    return this.service.find(query);
  }

  @Rest.FindOneById()
  findOneById(@Param() param: IDDto, @Query() query: QueryOneResourceDto) {
    return this.service.findOneByIdOrThrow(param, query);
  }

  @Rest.Count()
  count(@Query() query: QueryCountResourceDto) {
    return this.service.count(query);
  }

  @Rest.SaveOne()
  saveOne(@Body() body: CreateResourceDto) {
    return this.service.save(body);
  }

  @Rest.UpdateOneById()
  updateOneById(@Param() param: IDDto, @Body() body: UpdateResourceDto) {
    return this.service.update(param, body);
  }

  @Rest.DeleteOneById()
  deleteOneById(@Param() param: IDDto) {
    return this.service.softDelete(param);
  }

  @Rest.RestoreOneById()
  restore(@Param() param: IDDto) {
    return this.service.restore(param);
  }

  @Rest.AddRelation()
  addRelation(@Param() param: ResourceRelationParamDto) {
    return this.service.addRelation(param);
  }

  @Rest.RemoveRelation()
  removeRelation(@Param() param: ResourceRelationParamDto) {
    return this.service.removeRelation(param);
  }

  @Rest.SetRelation()
  setRelation(@Param() param: ResourceRelationParamDto) {
    return this.service.setRelation(param);
  }

  @Rest.UnsetRelation()
  unsetRelation(@Param() param: ResourceUnsetRelationParamDto) {
    return this.service.unsetRelation(param);
  }

  @Rest.Increment()
  increment(@Param() param: IDDto, @Body() body: IncrementResourceDto) {
    return this.service.increment(param, body);
  }

  @Rest.Decrement()
  decrement(@Param() param: IDDto, @Body() body: DecrementResourceDto) {
    return this.service.decrement(param, body);
  }
}
