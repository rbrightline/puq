import type { MethodDecoratorParam } from '@puq/type';
import { Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ResourceMetadataManager } from '@puq/meta';
import { CommonMethod } from '../common/common.js';
import { DeleteResultDto } from '@puq/orm';

export function Action(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = ResourceMetadataManager.get(args[0].constructor);
    CommonMethod({ summary: `Save ${M.names.pascalCase}` })(...args);
    Post(M.paths.action)(...args);
    ApiCreatedResponse({
      type: DeleteResultDto,
      description: `Successfully inserted ${M.names.pascalCase}`,
    })(...args);
  };
}
