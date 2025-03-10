import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function UpdateOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Update ${M.names.pascalCase} by id` })(...args);
    Put(M.paths.id)(...args);
    ApiBody({ type: M.updateDto() })(...args);
    Ok({
      type: ResDto,
      description: `Successfully updated ${M.names.pascalCase}`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
