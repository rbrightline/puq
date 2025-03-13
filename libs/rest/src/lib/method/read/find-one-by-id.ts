import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';

export function FindOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Delete ${M.names.pascalCase} by id` })(...args);
    Get(M.paths.id)(...args);
    ApiOkResponse({
      type: M.entity(),
      description: `Successfully found ${M.names.pascalCase} by id`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
