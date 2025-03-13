import type { MethodDecoratorParam } from '@puq/type';
import { Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { DeleteResultDto } from '@puq/orm';

/**
 * Restore entity by id
 * @returns - method decorator
 */
export function RestoreOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Restore ${M.names.pascalCase} by id` })(...args);
    Post(M.paths.id)(...args);
    ApiOkResponse({
      type: DeleteResultDto,
      description: `Successfully restored ${M.names.pascalCase} by id`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
