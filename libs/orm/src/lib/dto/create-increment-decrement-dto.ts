import type { Type } from '@nestjs/common';
import { Dto, Property } from '@puq/property';
import type { BaseModel, IncrementParam, Keys } from '@puq/type';

export function CreateIncrementDecrementDto<T extends BaseModel>(
  columns: Keys<T>,
): Type<IncrementParam> {
  @Dto()
  class IncrementParamDto implements IncrementParam {
    @Property({ type: 'string', enum: columns, required: true })
    property: string;

    @Property({ type: 'number', default: 1 })
    value: number;
  }

  return IncrementParamDto;
}
