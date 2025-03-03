import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { pluralize } from '@puq/names';

export function FindAll(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Find all ${pluralize(M.names.pascalCase)} by query` })(
      ...args,
    );
    Get(M.paths.plural)(...args);
    Ok({
      type: M.entity(),
      isArray: true,
      description: `Successfully queried ${pluralize(M.names.pascalCase)}`,
    })(...args);
    NotFound({
      description: `${M.names.pascalCase} entities not found by query`,
    })(...args);
  };
}
