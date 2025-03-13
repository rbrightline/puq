import type { MethodDecoratorParam } from '@puq/type';
import { Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { UpdateResultDto } from '@puq/orm';

export function SetRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({
      summary: `Set (one|many)-to-one relation to ${M.names.pascalCase} by relation params`,
    })(...args);
    Post(M.paths.relationId)(...args);
    ApiOkResponse({
      type: UpdateResultDto,
      description: `Successfully set relation to ${M.names.pascalCase}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
