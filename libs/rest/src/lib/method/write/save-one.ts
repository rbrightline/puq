import { Post } from '@nestjs/common';
import { ApiCreatedResponse as Created } from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import type { MethodDecoratorParam } from '@puq/type';
import { DeleteResultDto as ResDto } from '@puq/orm';

export function SaveOne(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common()(...args);
    Post(M.paths.singular)(...args);
    Created({ type: ResDto })(...args);
  };
}
