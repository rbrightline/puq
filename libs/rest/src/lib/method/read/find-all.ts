import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { pluralize } from '@puq/names';

/**
 * Request method decorator
 * `GET /api/items?`
 */
export function Find(): MethodDecorator {
  return (...args: MethodDecoratorParam) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({
      summary: `Find all ${pluralize(M.names.pascalCase)} by query`,
    })(...args);
    Get(M.paths.plural)(...args);
    ApiOkResponse({
      type: M.entity(),
      isArray: true,
      description: `Successfully queried ${pluralize(M.names.pascalCase)}`,
    })(...args);
    ApiNotFoundResponse({
      description: `${M.names.pascalCase} entities not found by query`,
    })(...args);
  };
}
