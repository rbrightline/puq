import { Controller as __Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { names } from '@puq/names';
import { ObjectLiteral, Type } from '@puq/type';

export function Controller<T extends ObjectLiteral>(
  entity: () => Type
): ClassDecorator {
  return (t) => {
    __Controller()(t);
    ApiBearerAuth()(t);
    ApiTags(names(entity().name).pascalCase + 'Controller')(t);
  };
}
