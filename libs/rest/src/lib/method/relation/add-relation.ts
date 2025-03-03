import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function AddRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({
      summary: `Add many-to-many relation to ${M.names.pascalCase} by relation params`,
    })(...args);
    Put(M.paths.relationId)(...args);
    Ok({
      type: ResDto,
      description: `Successfully added relation to ${M.names.pascalCase}`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
