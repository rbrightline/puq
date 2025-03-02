import { Controller as __Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { names } from '@puq/names';
import type { Type } from '@puq/type';
import { setEntityMetadata } from '../common/metadata.js';

/**
 *
 * @param entity Entity class
 * @returns -  {@link ClassDecorator}
 */
export function Controller<T>(entity: () => Type<T>): ClassDecorator {
  return (t) => {
    console.log(t, t.constructor, entity, entity().name, '  <<< Controller');
    setEntityMetadata(t, entity);
    __Controller()(t);
    ApiBearerAuth()(t);

    ApiTags(names(entity().name).pascalCase + 'Controller')(t);
  };
}
