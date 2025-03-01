import { Property } from '@puq/property';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseIdEntity {
  @Property({ type: 'integer' })
  @PrimaryGeneratedColumn()
  id: number;
}
