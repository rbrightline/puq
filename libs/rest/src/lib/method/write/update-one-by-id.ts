import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function UpdateOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common()(...args);
    Put(M.paths.id)(...args);
    Ok({ type: ResDto })(...args);
    NotFound()(...args);
  };
}
