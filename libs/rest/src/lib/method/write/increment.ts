import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { UpdateResultDto } from '@puq/orm';

export function Increment(): MethodDecorator {
  return (...args: MethodDecoratorParam) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({
      summary: `Increment the property of ${M.names.pascalCase} by value`,
    })(...args);
    Put(M.paths.increment)(...args);
    ApiOkResponse({
      type: UpdateResultDto,
      description: `Successfully incremented the property of ${M.names.pascalCase}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
