import type { Type } from '@puq/type';
import { InjectEntityService } from '@puq/provider';
import {
  AddRelation,
  Controller,
  Count,
  CreateController,
  DeleteOneById,
  FindAll,
  FindOneById,
  Param,
  Query,
  Body,
  RemoveRelation,
  SaveOne,
  SetRelation,
  UnsetRelation,
  UpdateOneById,
} from '@puq/rest';
import type { BaseEntity, EntityService } from '@puq/orm';
import { IDDto } from '@puq/orm';
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
    findAll(@Query(options.queryManyDto) query: any) {
      debug({ query });
      return this.service.find(query);
    }

    @FindOneById()
    findOneById(@Param(() => IDDto) { id }: IDDto) {
      debug({ id });
      return this.service.findOneById(id);
    }

    @Count()
    count(@Query(options.queryCountDto) query: any) {
      debug({ query });
      return this.service.count(query);
    }

    @SaveOne()
    saveOne(@Body(options.createDto) entity: any) {
      debug({ entity });
      return this.service.save(entity);
    }

    @UpdateOneById()
    updateOneById(
      @Param(() => IDDto) idObject: IDDto,
      @Body(options.updateDto) entity: any,
    ) {
      debug({ idObject, entity });
      return this.service.update(idObject.id, entity);
    }

    @DeleteOneById()
    DeleteOneById(@Param(() => IDDto) idObject: IDDto) {
      debug({ idObject });
      return this.service.softDelete(idObject.id);
    }

    @AddRelation()
    addRelation(@Param(options.relationDto) relation: any) {
      debug({ relation });
      return this.service.addRelation(relation);
    }

    @RemoveRelation()
    removeRelation(@Param(options.relationDto) relation: any) {
      debug({ relation });
      return this.service.removeRelation(relation);
    }

    @SetRelation()
    setRelation(@Param(options.relationDto) relation: any) {
      debug({ relation });
      return this.service.setRelation(relation);
    }

    @UnsetRelation()
    unsetRelation(@Param(options.unsetRelationDto) relation: any) {
      debug({ relation });
      return this.service.unsetRelation(relation);
    }
  }

  return BasicController;
}
