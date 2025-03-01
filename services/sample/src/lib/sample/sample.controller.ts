import { Controller, Get } from '@nestjs/common';
import { FindAllMethod } from '@puq/rest';
import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string' }) name: string;
}

@Controller()
export class SampleController {
  @Get('hello')
  hello() {
    return 'Updated is updated';
  }

  @FindAllMethod(() => Sample)
  findAll() {
    return [];
  }
}
