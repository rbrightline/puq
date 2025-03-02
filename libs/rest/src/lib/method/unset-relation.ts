/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel, Type } from '@puq/type';
import { Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { CommonMethod } from './common.js';
import { DeleteResultDto } from '@puq/orm';

/**
 * Unset relation (many-to-one)
 * @param entity function that return entity class
 * @returns
 */
export function UnsetRelation<T extends IDModel>(
  entity: () => Type<T>,
): MethodDecorator {
  return (...args: [any, any, any]) => {
    const P = paths(entity().name);
    CommonMethod()(...args);
    Delete(P.relation)(...args);
    ApiOkResponse({ type: DeleteResultDto })(...args);
  };
}
