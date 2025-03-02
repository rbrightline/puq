import type { IDModel } from '@puq/type';
import { Property } from '@puq/property';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseIdEntity implements IDModel {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;
}
