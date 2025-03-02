/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDModel } from '@puq/type';
import { Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { paths } from '@puq/names';
import { CommonMethod } from './common.js';
import { getEntityMetadata } from '../common/metadata.js';

/**
 * Find all entities by query
 * @param entity function that return entity class
 * @returns
 */
export function FindAll<T extends IDModel>(): MethodDecorator {
  return (...args: [any, any, any]) => {
    const classConstructor = args[0].constructor;
    const entity = getEntityMetadata(classConstructor);
    const P = paths(entity().name);
    //
    console.log(entity, '<<FindAll');
    console.log(entity().name, '<<FindAll');
    //
    CommonMethod()(...args);
    Get(P.plural)(...args);
    ApiOkResponse({ type: entity(), isArray: true })(...args);
  };
}
