import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { CountResultDto } from '@puq/orm';

export function Count(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Count ${M.names.pascalCase} by query` })(...args);
    Get(M.paths.count)(...args);
    ApiOkResponse({
      type: CountResultDto,
      description: `Successfully counted ${M.names.pascalCase} by query`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
