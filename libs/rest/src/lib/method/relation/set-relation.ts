import { Post } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import type { MethodDecoratorParam } from '@puq/type';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function SetRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common()(...args);
    Post(M.paths.relationId)(...args);
    Ok({ type: ResDto })(...args);
    NotFound()(...args);
  };
}
