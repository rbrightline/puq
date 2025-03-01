import { Property } from '@puq/property';
import { type IDModel } from '@puq/type';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseIdEntity implements IDModel {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;
}
