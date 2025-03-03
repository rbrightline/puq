import type { MethodDecoratorParam } from '@puq/type';
import { Delete } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { DeleteResultDto as ResDto } from '@puq/orm';

export function DeleteOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Delete ${M.names.pascalCase} by id` })(...args);
    Delete(M.paths.id)(...args);
    Ok({
      type: ResDto,
      description: `Successfully deleted ${M.names.pascalCase} by id`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
