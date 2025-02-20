import 'reflect-metadata';

import { Dto, Property } from '@puq/property';
import { Column } from './decorator/column.js';
import { Entity } from './decorator/entity.js';
import { BaseEntity } from './entity/base.js';
import { Relation } from './decorator/relation.js';
import { DataSource, Repository } from 'typeorm';
import { TableNamingStrategy } from './factory/naming-strategy.js';

@Dto()
export class TestObject {
  @Property({ type: 'string' })
  value: string;
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

  @Relation('many-to-one', () => OneRelation, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    join: true,
  })
  one: OneRelation;

  @Relation('many-to-one', () => ManyRelation, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    join: true,
  })
  many: ManyRelation;

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
  attributes: AttributeRelation;
}

// postgres.conf
// max_connections = 200  # Allow room for app + admin connections
// shared_buffers = 4GB   # Allocate 25-40% of server RAM
// work_mem = 16MB       # Memory per query/sort

// poolSize: 50, // Maximum number of connections in the pool
//   extra: {
//     min: 10,           // Minimum number of connections kept open
//     max: 50,           // Maximum number of connections (matches poolSize)
//     idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
//     connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
//   },

describe('Postgres Integration', () => {
  let ds: DataSource;
  let TestEntityRepo: Repository<TestEntity>;
  let OneRelationRepo: Repository<OneRelation>;
  let ManyRelationRepo: Repository<ManyRelation>;
  let OwnerRelationRepo: Repository<OwnerRelation>;
  let AttributeRelationRepo: Repository<AttributeRelation>;

  beforeAll(async () => {
    ds = await new DataSource({
      type: 'postgres',
      username: 'testuser',
      password: 'password',
      database: 'testdb',
      entities: [
        TestEntity,
        OneRelation,
        ManyRelation,
        OwnerRelation,
        AttributeRelation,
      ],
      synchronize: true,
      dropSchema: true,
      namingStrategy: new TableNamingStrategy(),
      poolSize: 50, // Maximum number of connections in the pool
      extra: {
        min: 10, // Minimum number of connections kept open
        max: 50, // Maximum number of connections (matches poolSize)
        idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
        connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
      },
    }).initialize();

    TestEntityRepo = ds.getRepository(TestEntity);
    OneRelationRepo = ds.getRepository(OneRelation);
    ManyRelationRepo = ds.getRepository(ManyRelation);
    OwnerRelationRepo = ds.getRepository(OwnerRelation);
    AttributeRelationRepo = ds.getRepository(AttributeRelation);
  });
  it('should initialize postgres database', () => {
    expect(ds).toBeTruthy();
    expect(TestEntityRepo).toBeTruthy();
    expect(OneRelationRepo).toBeTruthy();
    expect(ManyRelationRepo).toBeTruthy();
    expect(OwnerRelationRepo).toBeTruthy();
    expect(AttributeRelationRepo).toBeTruthy();
  });

  it('should create items', async () => {
    await TestEntityRepo.save({
      array: ['some', 'other'],
      number: 11122233344455566,
      bigint: 111222333444555666n,
      boolean: true,
      integer: 1222333444,
      object: new TestObject(),
      string: 'string value',
    });
    await OneRelationRepo.save({});
    await ManyRelationRepo.save({});
    await OwnerRelationRepo.save({});
    await AttributeRelationRepo.save({});
  });

  describe('Seperate insert', () => {
    it(
      'should handle 10000 simultaneous request ',
      { timeout: 100_000 },
      async () => {
        const requests = 'r'
          .repeat(100)
          .split('')
          .map(() => {
            return TestEntityRepo.save({
              array: ['some', 'other'],
              number: 11122233344455566,
              bigint: 111222333444555666n,
              boolean: true,
              integer: 1222333444,
              object: new TestObject(),
              string: 'string value',
            });
          });

        await Promise.all(requests);
      }
    );
  });

  describe('Bulk insert', () => {
    it(
      'should handle 10000 simultaneous bulk insert ',
      { timeout: 100_000 },
      async () => {
        const data = 'r'
          .repeat(100)
          .split('')
          .map(() => {
            return {};
          });

        await TestEntityRepo.save(data);
      }
    );
  });
});
