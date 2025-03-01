import { Dto, Property } from '@puq/property';
import { Relation } from '../decorator/relation.js';
import { Entity } from '../decorator/entity.js';
import { Column } from '../decorator/column.js';
import { BaseEntity } from '../entity/base.js';

@Dto()
export class TestObject {
  @Property({ type: 'string' }) value: string;
}

@Entity()
export class OneRelation extends BaseEntity {
  @Column({ type: 'string' }) one: string;
}

@Entity()
export class ManyRelation extends BaseEntity {
  @Column({ type: 'string' }) many: string;
}

@Entity()
export class OwnerRelation extends BaseEntity {
  @Column({ type: 'string' }) owner: string;
}

@Entity()
export class AttributeRelation extends BaseEntity {
  @Column({ type: 'string' }) key: string;
  @Column({ type: 'string' }) value: string;
}

@Entity()
export class TestEntity extends BaseEntity {
  @Column({ type: 'string' }) string: string;
  @Column({ type: 'integer' }) integer: number;
  @Column({ type: 'number' }) number: number;
  @Column({ type: 'boolean' }) boolean: boolean;
  @Column({ type: 'bigint' }) bigint: bigint;
  @Column({ type: 'object', target: () => TestObject }) object: TestObject;
  @Column({ type: 'array', items: { type: 'string' } }) array: string[];
  @Column({ type: 'date' }) date: string;

  @Relation({
    type: 'many-to-one',
    target: () => OneRelation,
    eager: true,
    required: false,
    onDelete: 'SET NULL',
    join: true,
  })
  one: OneRelation;

  @Relation({
    type: 'many-to-many',
    target: () => ManyRelation,
    eager: true,
    required: false,
    onDelete: 'SET NULL',
    join: true,
  })
  many: ManyRelation[];

  @Relation({
    type: 'many-to-one',
    target: () => OwnerRelation,
    eager: true,
    required: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    join: true,
  })
  owner: OwnerRelation;

  @Relation({
    type: 'many-to-many',
    target: () => AttributeRelation,
    eager: true,
    required: false,
    cascade: ['insert'],
    join: true,
  })
  attributes: AttributeRelation[];
}
