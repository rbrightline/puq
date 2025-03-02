/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel, Type } from '@puq/type';
import { Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { CommonMethod } from './common.js';
import { DeleteResultDto } from '@puq/orm';

/**
 * Delete entity by id
 * @param entity function that return entity class
 * @returns
 */
export function DeleteOneById<T extends IDModel>(
  entity: () => Type<T>,
): MethodDecorator {
  return (...args: [any, any, any]) => {
    const P = paths(entity().name);
    CommonMethod()(...args);
    Delete(P.id)(...args);
    ApiOkResponse({ type: DeleteResultDto })(...args);
  };
}
