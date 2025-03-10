import type { MethodDecoratorParam } from '@puq/type';
import { Delete } from '@nestjs/common';
import {
  ApiParam,
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function RemoveRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({
      summary: `Remove many-to-many relation from ${M.names.pascalCase} by relation params`,
    })(...args);
    ApiParam({ type: M.relationDto?.() } as any)(...args);
    Delete(M.paths.relationId)(...args);
    Ok({
      type: ResDto,
      description: `Successfully removed relation from ${M.names.pascalCase}`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
