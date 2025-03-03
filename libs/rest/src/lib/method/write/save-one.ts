import type { MethodDecoratorParam } from '@puq/type';
import { Post } from '@nestjs/common';
import { ApiCreatedResponse as Created } from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { DeleteResultDto as ResDto } from '@puq/orm';

export function SaveOne(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Save ${M.names.pascalCase}` })(...args);
    Post(M.paths.singular)(...args);
    Created({
      type: ResDto,
      description: `Successfully inserted ${M.names.pascalCase}`,
    })(...args);
  };
}
