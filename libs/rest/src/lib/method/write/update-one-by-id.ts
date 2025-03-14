import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { UpdateResultDto } from '@puq/orm';

export function UpdateOneById(): MethodDecorator {
  return (...args: MethodDecoratorParam) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Update ${M.names.pascalCase} by id` })(...args);
    Put(M.paths.id)(...args);
    ApiOkResponse({
      type: UpdateResultDto,
      description: `Successfully updated ${M.names.pascalCase}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
