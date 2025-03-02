/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel, Type } from '@puq/type';
import { Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { CommonMethod } from './common.js';
import { UpdateResultDto } from '@puq/orm';

/**
 * Delete relation (many-to-many)
 * @param entity function that return entity class
 * @returns
 */
export function DeleteRelation<T extends IDModel>(
  entity: () => Type<T>,
): MethodDecorator {
  return (...args: [any, any, any]) => {
    const P = paths(entity().name);
    CommonMethod()(...args);
    Delete(P.relationId)(...args);
    ApiOkResponse({ type: UpdateResultDto })(...args);
  };
}
