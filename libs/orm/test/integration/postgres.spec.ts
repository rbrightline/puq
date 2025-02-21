import 'reflect-metadata';
import { DataSource, DeepPartial, Equal, Repository } from 'typeorm';

import {
  AttributeRelation,
  ManyRelation,
  OneRelation,
  OwnerRelation,
  TestEntity,
  TestObject,
} from './postgres-entities.js';
import { TableNamingStrategy } from '../../src/index.js';

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
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

  it('[Postgres] should initialize repositories', () => {
    expect(ds).toBeTruthy();
    expect(TestEntityRepo).toBeTruthy();
    expect(OneRelationRepo).toBeTruthy();
    expect(ManyRelationRepo).toBeTruthy();
    expect(OwnerRelationRepo).toBeTruthy();
    expect(AttributeRelationRepo).toBeTruthy();
  });

  it('[Postgres] should create tables,columns, and relations as expected', async () => {
    const oneData = await OneRelationRepo.save({});
    const manyData = await ManyRelationRepo.save({});
    const ownerData = await OwnerRelationRepo.save({});
    const attributeData = await AttributeRelationRepo.save({});
    const dateValue = new Date().toISOString();

    const testData: DeepPartial<TestEntity> = {
      string: 'string',
      array: ['some'],
      number: 111_222_333.88,
      bigint: 111_222_333_444_555n,
      boolean: true,
      integer: 111_222_333,
      object: new TestObject(),
      date: dateValue,
    };

    const entityData = await TestEntityRepo.save(testData);

    await TestEntityRepo.createQueryBuilder()
      .relation('one')
      .of(entityData.id)
      .set(oneData.id);

    await TestEntityRepo.createQueryBuilder()
      .relation('many')
      .of(entityData.id)
      .add(manyData.id);

    await TestEntityRepo.createQueryBuilder()
      .relation('attributes')
      .of(entityData.id)
      .add(attributeData.id);

    await TestEntityRepo.createQueryBuilder()
      .relation('owner')
      .of(entityData.id)
      .set(ownerData.id);

    const found = await TestEntityRepo.find({
      where: { id: Equal(testData.id!) },
    });

    expect(found[0].id).toEqual(entityData.id);
    expect(found[0].createdAt).toEqual(entityData.createdAt);
    expect(found[0].deletedAt).toEqual(entityData.deletedAt);

    expect(found[0].string).toEqual(testData.string);
    expect(parseFloat(found[0].number as unknown as string)).toEqual(
      testData.number
    );
    expect(found[0].integer).toEqual(testData.integer);
    expect(found[0].boolean).toEqual(testData.boolean);
    expect(BigInt(found[0].bigint)).toEqual(testData.bigint);
    expect(found[0].date).toEqual(testData.date);
    expect(found[0].object).toEqual(testData.object);
    expect(found[0].one.id).toEqual(oneData.id);
    expect(found[0].many[0].id).toEqual(manyData.id);
    expect(found[0].owner.id).toEqual(ownerData.id);
    expect(found[0].attributes[0].id).toEqual(attributeData.id);
  });

  it('[Postgres] should handle high load', async () => {
    const paralenExecution = 'r'
      .repeat(100)
      .split('')
      .map((e) => TestEntityRepo.save({}));
    await Promise.all(paralenExecution);
  });
});
