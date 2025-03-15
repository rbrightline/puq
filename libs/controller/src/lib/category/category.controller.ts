import { Rest } from '@puq/rest';
import { Body, Param, Query } from '@nestjs/common';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryRelationParamDto,
  CategoryUnsetRelationParamDto,
  QueryCountCategoryDto,
  IncrementCategoryDto,
  DecrementCategoryDto,
  QueryManyCategoryDto,
  QueryOneCategoryDto,
} from '@puq/entity';
import { EntityService, IDDto, InjectEntityService } from '@puq/orm';

@Rest.Controller()
export class CategoryController {
  @Rest.SetResourceMetadata({ entity: () => Category })
  protected readonly __metadata__ = '';

  constructor(
    @InjectEntityService() protected readonly service: EntityService<Category>,
  ) {}

  @Rest.Find()
  find(@Query() query: QueryManyCategoryDto) {
    return this.service.find(query);
  }

  @Rest.FindOneById()
  findOneById(@Param() param: IDDto, @Query() query: QueryOneCategoryDto) {
    return this.service.findOneByIdOrThrow(param, query);
  }

  @Rest.Count()
  count(@Query() query: QueryCountCategoryDto) {
    return this.service.count(query);
  }

  @Rest.SaveOne()
  saveOne(@Body() body: CreateCategoryDto) {
    return this.service.save(body);
  }

  @Rest.UpdateOneById()
  updateOneById(@Param() param: IDDto, @Body() body: UpdateCategoryDto) {
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
  addRelation(@Param() param: CategoryRelationParamDto) {
    return this.service.addRelation(param);
  }

  @Rest.RemoveRelation()
  removeRelation(@Param() param: CategoryRelationParamDto) {
    return this.service.removeRelation(param);
  }

  @Rest.SetRelation()
  setRelation(@Param() param: CategoryRelationParamDto) {
    return this.service.setRelation(param);
  }

  @Rest.UnsetRelation()
  unsetRelation(@Param() param: CategoryUnsetRelationParamDto) {
    return this.service.unsetRelation(param);
  }

  @Rest.Increment()
  increment(@Param() param: IDDto, @Body() body: IncrementCategoryDto) {
    return this.service.increment(param, body);
  }

  @Rest.Decrement()
  decrement(@Param() param: IDDto, @Body() body: DecrementCategoryDto) {
    return this.service.decrement(param, body);
  }
}
