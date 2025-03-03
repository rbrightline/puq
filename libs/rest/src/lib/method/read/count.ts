import type { MethodDecoratorParam } from '@puq/type';
import { Get } from '@nestjs/common';
import {
  ApiNotFoundResponse as NotFound,
  ApiOkResponse as Ok,
} from '@nestjs/swagger';
import { ResourceMetadataManager as Meta } from '@puq/meta';
import { CommonMethod as Common } from '../common/common.js';
import { CountResultDto as ResDto } from '@puq/orm';

export function Count(): MethodDecorator {
  return <T>(...args: MethodDecoratorParam<T>) => {
    const M = Meta.get(args[0].constructor);
    Common({ summary: `Count ${M.names.pascalCase} by query` })(...args);
    Get(M.paths.count)(...args);
    Ok({
      type: ResDto,
      description: `Successfully counted ${M.names.pascalCase} by query`,
    })(...args);
    NotFound({ description: `${M.names.pascalCase} entity not found by id` })(
      ...args,
    );
  };
}
