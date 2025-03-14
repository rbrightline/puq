import type { MethodDecoratorParam } from '@puq/type';
import { Delete } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { DeleteResultDto } from '@puq/orm';

/**
 * delete entity by id
 * @returns - method decorator
 */
export function DeleteOneById(): MethodDecorator {
  return (...args: MethodDecoratorParam) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Soft delete ${M.names.pascalCase} by id` })(
      ...args,
    );
    Delete(M.paths.id)(...args);
    ApiOkResponse({
      type: DeleteResultDto,
      description: `Successfully deleted ${M.names.pascalCase} by id`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entity not found by id`,
    })(...args);
  };
}
