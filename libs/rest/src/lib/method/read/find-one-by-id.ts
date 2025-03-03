import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';

export function FindOneById(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Delete ${M.names.pascalCase} by id` })(...args);
    Get(M.paths.id)(...args);
    Ok({
      type: M.entity(),
      description: `Successfully found ${M.names.pascalCase} by id`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
