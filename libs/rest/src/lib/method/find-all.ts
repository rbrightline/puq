/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel, Type } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { ValidationErrorDto } from '@puq/orm';
import { CommonMethod } from './common.js';

/**
 * Find all entities
 * @param path rest api path
 * @returns
 */
export function FindAllMethod<T extends IDModel>(
  entity: () => Type<T>,
): MethodDecorator {
  return (...args: [any, any, any]) => {
    const N = paths(entity().name);

    CommonMethod()(...args);
    Get(N.plural)(...args);
    ApiOkResponse({ type: entity(), isArray: true })(...args);
    ApiUnprocessableEntityResponse({
      type: ValidationErrorDto,
      description: 'Invalid query param',
    })(...args);
  };
}
