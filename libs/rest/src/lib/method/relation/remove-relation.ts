import type { MethodDecoratorParam } from '@puq/type';
import { Delete } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { UpdateResultDto } from '@puq/orm';

export function RemoveRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({
      summary: `Remove many-to-many relation from ${M.names.pascalCase} by relation params`,
    })(...args);

    Delete(M.paths.relationId)(...args);
    ApiOkResponse({
      type: UpdateResultDto,
      description: `Successfully removed relation from ${M.names.pascalCase}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
