/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel, Type } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { CommonMethod } from './common.js';

/**
 * Find entity by id
 * @param entity function that return entity class
 * @returns
 */
export function FindOneById<T extends IDModel>(
  entity: () => Type<T>,
): MethodDecorator {
  return (...args: [any, any, any]) => {
    const P = paths(entity().name);

    CommonMethod()(...args);
    Get(P.id)(...args);
    ApiOkResponse({ type: entity() })(...args);
  };
}
