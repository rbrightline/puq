/* eslint-disable @typescript-eslint/no-explicit-any */
import { Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommonMethod } from './common.js';
import { UpdateResultDto } from '@puq/orm';
import { ResourceMetadataManager } from '../meta/resource-metadata.js';
/**
 * Add relation (many-to-many)
 * @param entity function that return entity class
 * @returns
 */
export function AddRelation(): MethodDecorator {
  return (...args: [any, any, any]) => {
    const paths = ResourceMetadataManager.paths(args[0]);
    CommonMethod()(...args);
    Put(paths.relationId)(...args);
    ApiOkResponse({ type: UpdateResultDto })(...args);
  };
}
