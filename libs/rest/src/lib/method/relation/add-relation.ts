import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { UpdateResultDto } from '@puq/orm';

export function AddRelation(): MethodDecorator {
  return (...args: MethodDecoratorParam) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({
      summary: `Add many-to-many relation to ${M.names.pascalCase} by relation params`,
    })(...args);
    Put(M.paths.relationId)(...args);
    ApiOkResponse({
      type: UpdateResultDto,
      description: `Successfully added relation to ${M.names.pascalCase}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
