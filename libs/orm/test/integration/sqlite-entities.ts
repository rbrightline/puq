import { Dto, Property } from '@puq/property';
import { Column, Entity, Relation, BaseEntity } from '../../src/index.js';

@Dto()
export class TestObject {
  @Property({ type: 'string', databaseType: 'sqlite' }) value: string;
}

@Entity()
export class OneRelation extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) one: string;
}

@Entity()
export class ManyRelation extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) many: string;
}

@Entity()
export class OwnerRelation extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) owner: string;
}

@Entity()
export class AttributeRelation extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) key: string;
  @Column({ type: 'string', databaseType: 'sqlite' }) value: string;
}

@Entity()
export class TestEntity extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) string: string;
  @Column({ type: 'integer', databaseType: 'sqlite' }) integer: number;
  @Column({ type: 'number', databaseType: 'sqlite' }) number: number;
  @Column({ type: 'boolean', databaseType: 'sqlite' }) boolean: boolean;
  @Column({ type: 'bigint', databaseType: 'sqlite' }) bigint: bigint;
  @Column({ type: 'object', databaseType: 'sqlite', target: () => TestObject })
  object: TestObject;
  @Column({ type: 'array', databaseType: 'sqlite', items: { type: 'string' } })
  array: string[];
  @Column({ type: 'date', databaseType: 'sqlite' }) date: string;

  @Relation('many-to-one', () => OneRelation, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    join: true,
  })
  one: OneRelation;

  @Relation('many-to-many', () => ManyRelation, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    join: true,
  })
  many: ManyRelation[];

  @Relation('many-to-one', () => OwnerRelation, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    join: true,
  })
  owner: OwnerRelation;

  @Relation('many-to-many', () => AttributeRelation, {
    eager: true,
    onDelete: 'SET NULL',
    join: true,
  })
  attributes: AttributeRelation[];
}
