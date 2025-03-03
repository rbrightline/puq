import type { MethodDecoratorParam } from '@puq/type';
import { Delete } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function UnsetRelation(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({
      summary: `Delete (one|many)-to-one relation from ${M.names.pascalCase} by relation params`,
    })(...args);
    Delete(M.paths.relation)(...args);
    Ok({
      type: ResDto,
      description: `Successfully deleted relation from ${M.names.pascalCase}`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
