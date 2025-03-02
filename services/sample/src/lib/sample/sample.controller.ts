import { FindAll, SetResourceMetadata, Controller } from '@puq/rest';
import { Entity, Column, BaseEntity } from '@puq/orm';
import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string' }) sample: string;
}

@Entity()
export class Other {
  @ApiProperty({ type: 'array', items: { type: 'string' }, required: true })
  createdAt: Date;
  @Column({ type: 'string' }) other: string;
}

export function CreateControllerFor(entity: () => Type) {
  class ControllerClass {
    @SetResourceMetadata({ entity })
    __metadata: unknown;
  }
  return ControllerClass;
}

@Controller()
export class SampleController extends CreateControllerFor(() => Sample) {
  @FindAll()
  findAll() {
    return [];
  }
}

@Controller()
export class OtherController extends CreateControllerFor(() => Other) {
  @FindAll()
  findAll() {
    return [];
  }
}
