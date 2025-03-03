import type { MethodDecoratorParam } from '@puq/type';
import { Put } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { UpdateResultDto as ResDto } from '@puq/orm';

export function Decrement(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({
      summary: `Decrement the property of ${M.names.pascalCase} by value`,
    })(...args);
    Put(M.paths.decrement)(...args);
    Ok({
      type: ResDto,
      description: `Successfully decremented the property of ${M.names.pascalCase}`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
