import type { Type } from '@puq/type';
import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InjectEntityService } from '@puq/provider';
import {
  AddRelation,
  Controller,
  Count,
  CreateController,
  DeleteOneById,
  FindAll,
  FindOneById,
  RemoveRelation,
  SaveOne,
  SetRelation,
  UnsetRelation,
  UpdateOneById,
} from '@puq/rest';
import type { BaseEntity, EntityService } from '@puq/orm';
import type { SetResourceMetadataOptions } from '@puq/meta';
import { debug } from '@puq/debug';

export function BasicResourceController<T extends BaseEntity>(
  options: SetResourceMetadataOptions<T>,
): Type {
  @Controller()
  class BasicController extends CreateController({ ...options }) {
    constructor(
      @InjectEntityService(options.entity())
      protected readonly service: EntityService<T>,
    ) {
      super(service);
    }

    @FindAll()
    findAll(@Query() query: any) {
      debug({ query });
      return this.service.find(query);
    }

    @FindOneById()
    findOneById(@Param('id', ParseIntPipe) id: number) {
      debug({ id });
      return this.service.findOneById(id);
    }

    @Count()
    count(@Query() query: any) {
      debug({ query });
      return this.service.count(query);
    }

    @SaveOne()
    saveOne(@Body() entity: any) {
      debug({ entity });
      return this.service.save(entity);
    }

    @UpdateOneById()
    updateOneById(@Param('id', ParseIntPipe) id: number, @Body() entity: any) {
      debug({ id, entity });
      return this.service.update(id, entity);
    }

    @DeleteOneById()
    DeleteOneById(@Param('id', ParseIntPipe) id: number) {
      debug({ id });
      return this.service.softDelete(id);
    }

    @AddRelation()
    addRelation(@Param() relation: any) {
      debug({ relation });
      return this.service.addRelation(relation);
    }

    @RemoveRelation()
    removeRelation(@Param() relation: any) {
      debug({ relation });
      return this.service.removeRelation(relation);
    }

    @SetRelation()
    setRelation(@Param() relation: any) {
      debug({ relation });
      return this.service.setRelation(relation);
    }

    @UnsetRelation()
    unsetRelation(@Param() relation: any) {
      debug({ relation });
      return this.service.unsetRelation(relation);
    }
  }

  return BasicController;
}
