import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import { TableNamingStrategy } from '../factory/naming-strategy.js';
import {
  AttributeRelation,
  ManyRelation,
  OneRelation,
  OwnerRelation,
  TestEntity,
  TestObject,
} from './test-entity.js';
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

  let saved: TestEntity;

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
